/**
 * Nord Werk — latest Facebook Page posts → JSON for the website
 *
 * Paste this into a NEW Apps Script project (script.google.com → New project),
 * add the two Script Properties below, then deploy it as a Web App.
 * Setup steps: see FACEBOOK-FEED-VIA-APPS-SCRIPT.md
 *
 * Why this exists: Facebook's Page Plugin embed stopped serving this page's
 * timeline to logged-out visitors (it returns the header only). This asks the
 * Graph API for the posts directly and hands the website plain JSON, which it
 * renders in its own dark theme.
 *
 * SECRETS: the Page access token goes in Script Properties — never in this
 * file, and never in the website. The website repo is public; this script is
 * the only thing that ever sees the token.
 *
 *   Project Settings (⚙) → Script Properties:
 *     FB_PAGE_ID     the numeric Page id
 *     FB_PAGE_TOKEN  the never-expiring Page access token
 */
var GRAPH_VERSION = "v26.0";   // Meta auto-upgrades calls once a version retires
var POST_LIMIT    = 6;         // how many recent posts to ask for
var CACHE_SECONDS = 900;       // 15 min — the site never hits Facebook per page view
var STALE_SECONDS = 21600;     // 6 h — the most CacheService will hold

function doGet() {
  var cache = CacheService.getScriptCache();

  var fresh = cache.get("feed");
  if (fresh) return json_(fresh);

  var props  = PropertiesService.getScriptProperties();
  var pageId = props.getProperty("FB_PAGE_ID");
  var token  = props.getProperty("FB_PAGE_TOKEN");
  if (!pageId || !token) {
    return json_(JSON.stringify({ ok: false, error: "FB_PAGE_ID / FB_PAGE_TOKEN not set in Script Properties" }));
  }

  var url = "https://graph.facebook.com/" + GRAPH_VERSION + "/" + encodeURIComponent(pageId) + "/posts" +
            "?fields=" + encodeURIComponent("message,created_time,permalink_url,full_picture") +
            "&limit=" + POST_LIMIT +
            "&access_token=" + encodeURIComponent(token);

  var res, body, code;
  try {
    res  = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    code = res.getResponseCode();
    body = JSON.parse(res.getContentText());
  } catch (err) {
    return staleOr_(cache, "fetch failed: " + err);
  }

  if (code !== 200) {
    // A revoked/expired token or a permission problem lands here. Keep serving
    // the last good posts so the website doesn't go blank, but report the cause.
    var msg = (body && body.error && body.error.message) || ("HTTP " + code);
    return staleOr_(cache, msg);
  }

  var posts = (body.data || [])
    .filter(function (p) { return p.message || p.full_picture; })   // skip empty shares
    .map(function (p) {
      return {
        text:  p.message || "",
        image: p.full_picture || "",
        url:   p.permalink_url || "",
        time:  p.created_time || ""
      };
    });

  var out = JSON.stringify({ ok: true, fetched: new Date().toISOString(), posts: posts });
  cache.put("feed", out, CACHE_SECONDS);
  cache.put("feed_lastgood", out, STALE_SECONDS);
  saveLastGood_(posts);
  return json_(out);
}

/* CacheService forgets after 6 h at most, so a token that breaks overnight used
   to leave the site with no posts at all. Keep a slim copy of the newest posts
   in Script Properties too (9 KB per value), which never expires. */
function saveLastGood_(posts) {
  try {
    var slim = posts.slice(0, 3).map(function (p) {
      return { text: p.text.length > 400 ? p.text.slice(0, 400) + "…" : p.text, image: p.image, url: p.url, time: p.time };
    });
    var bytes = function (s) { return encodeURIComponent(s).replace(/%[0-9A-F]{2}/g, "x").length; };
    var s = JSON.stringify({ ok: true, fetched: new Date().toISOString(), posts: slim });
    if (bytes(s) > 8500) {
      slim.forEach(function (p) { p.image = ""; });
      s = JSON.stringify({ ok: true, fetched: new Date().toISOString(), posts: slim });
    }
    if (bytes(s) <= 8500) PropertiesService.getScriptProperties().setProperty("FEED_LASTGOOD", s);
  } catch (e) { /* best effort — never break a good response */ }
}

/* On failure, prefer the last good payload over an error — a dead token should
   degrade to "slightly old posts", not an empty section. */
function staleOr_(cache, error) {
  var last = cache.get("feed_lastgood") || PropertiesService.getScriptProperties().getProperty("FEED_LASTGOOD");
  if (last) {
    var o = JSON.parse(last);
    o.stale = true;
    o.error = error;
    return json_(JSON.stringify(o));
  }
  return json_(JSON.stringify({ ok: false, error: error }));
}

function json_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}

/* Run this once from the editor (select it, press ▶ Run) to authorise the
   script and confirm the token works. Check the output under "Execution log". */
function testFeed() {
  CacheService.getScriptCache().removeAll(["feed"]);   // force a live fetch
  Logger.log(doGet().getContent());
}

/* The Page token never expires, but Facebook only lets it READ for ~90 days
   ("Data Access Expires") before it must be renewed. This runs daily and
   emails the script owner as soon as Facebook refuses, so the token gets
   renewed before anyone notices stale posts. */
function healthCheck() {
  CacheService.getScriptCache().removeAll(["feed"]);   // force a live fetch
  var o = JSON.parse(doGet().getContent());
  if (o.ok && !o.stale) return;
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(),
    "Nord Werk website: Facebook feed needs a new token",
    "The website's Facebook posts stopped updating.\n\n" +
    "Facebook said: " + o.error + "\n\n" +
    "Fix (about 5 minutes): get a new Page token (FACEBOOK-FEED-VIA-APPS-SCRIPT.md, " +
    "\"When it stops updating\"), then paste it into this script's Project Settings → " +
    "Script Properties → FB_PAGE_TOKEN. No redeploy needed."
  );
}

/* Run this ONCE from the editor to start the daily check above. */
function installDailyCheck() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "healthCheck") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("healthCheck").timeBased().everyDays(1).atHour(9).create();
  Logger.log("Daily check installed — you'll get an email if the feed breaks.");
}
