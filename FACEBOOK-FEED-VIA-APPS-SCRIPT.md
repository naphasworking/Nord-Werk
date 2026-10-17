# Show your latest Facebook posts on the website

Facebook's own embed now only shows your page header (name, followers,
Follow button) to people who aren't logged in — no posts. So the site gets
your posts a different way: a small **Google Apps Script** asks Facebook for
them directly and hands the website plain JSON. The posts then appear in the
site's own dark design, and update by themselves.

**Total time: about 20–30 minutes, once.**

> **Keep the token private.** In step 4 you'll copy a long *access token*.
> It goes **only** into the Apps Script (step 6). Never paste it into
> `script.js`, never commit it, and don't send it in chat — the website repo
> is public. The only thing to send me at the end is the **`/exec` URL**.

---

## Part A — Get a Page token from Facebook (~15 min)

1. **Create a Meta app**
   - Go to **https://developers.facebook.com/apps** and log in with the
     Facebook account that manages the Nord Werk page.
   - **Create app**. Name it anything (e.g. *Nord Werk Website*).
   - When asked what it's for, choose **Other**, then app type **Business**.
     (Meta changes these screens often — pick whatever is closest.)
   - You don't need to publish it or submit it for review. It stays in
     *Development* mode, which is fine because only you use it.

2. **Get a user token with page permissions**
   - Open **https://developers.facebook.com/tools/explorer/**
   - Top right, **Meta App:** pick the app you just made.
   - **User or Page:** choose **Get User Access Token**.
   - Under **Permissions**, add exactly these two:
     - `pages_show_list`
     - `pages_read_engagement`
   - Click **Generate Access Token**, log in, and when asked which pages,
     tick **Nord Werk Pattaya**. Allow.

3. **Make it long-lived**
   - Copy the token from the Explorer.
   - Open **https://developers.facebook.com/tools/debug/accesstoken/**,
     paste it, press **Debug**.
   - Scroll down and press **Extend Access Token**. Copy the *new* token it
     shows (this one lasts ~60 days — but we only need it for one more step).

4. **Get the never-expiring Page token**
   - Back in the **Graph API Explorer**, paste that long-lived token into the
     **Access Token** box.
   - In the query bar type **`me/accounts`** and press **Submit**.
   - In the result, find the block with `"name": "Nord Werk Pattaya"`. Copy:
     - its **`access_token`** — this is the Page token
     - its **`id`** — this is the Page ID
   - *Optional check:* paste the Page token into the Access Token Debugger.
     **Expires** should say **Never**.

---

## Part B — Set up the Apps Script (~10 min)

5. **New project**
   - Go to **https://script.google.com** → **New project**.
   - Rename it (top left) to *Nord Werk Facebook feed*.
   - Delete everything in `Code.gs`, paste everything from
     **`facebook-feed.gs`** (in this repo), and **save** (💾).

6. **Store the token safely**
   - Left sidebar → **Project Settings** (⚙).
   - Scroll to **Script Properties** → **Add script property**, twice:

     | Property        | Value                         |
     |-----------------|-------------------------------|
     | `FB_PAGE_ID`    | the `id` from step 4          |
     | `FB_PAGE_TOKEN` | the `access_token` from step 4 |

   - **Save script properties**.

7. **Test it**
   - Back in the **Editor** (`< >` icon). In the function dropdown at the
     top, choose **`testFeed`**, press **▶ Run**.
   - First time only: **Review permissions** → your Google account →
     **Advanced** → **Go to … (unsafe)** → **Allow** (it's your own script).
   - Open **Execution log**. You should see `"ok":true` and your recent
     posts. If you see `"ok":false`, the message says why — usually a token
     pasted with a missing character.

8. **Deploy as a Web App**
   - **Deploy → New deployment** → gear ⚙ → **Web app**
   - **Execute as:** *Me*
   - **Who has access:** **Anyone**
   - **Deploy**, then copy the **Web app URL** — it ends in **`/exec`**.
   - Paste that URL into a browser tab: you should see the same JSON.

9. **Connect the site**
   - Send me the `/exec` URL (**not** the token) and I'll put it in
     `script.js`, or do it yourself:
     ```js
     const FB_FEED = {
       endpoint: "https://script.google.com/macros/s/AKfyc.../exec",
       show: 3
     };
     ```
   - Commit/push once. From then on, new posts show up on the site within
     about 15 minutes of posting on Facebook.

---

## How it behaves

- **Fast:** the script caches your posts for 15 minutes, so visitors never
  wait on Facebook, and Facebook's ~300 KB SDK no longer loads at all.
- **Safe if something breaks:** if Facebook stops answering (for example the
  token is revoked), the script keeps serving the last posts it fetched for
  up to 6 hours, and the site falls back to the plain Facebook follow card
  rather than an empty box.
- **Posts with no text and no picture** (bare shares) are skipped.

## When it stops updating

The Page token doesn't expire on a timer, but Facebook **does** cancel it if
you change your Facebook password, lose admin on the page, or remove the app
from your account. To fix: redo **steps 2–4**, then replace `FB_PAGE_TOKEN`
in **Script Properties**. No redeploy needed, and the `/exec` URL stays the
same.

If you ever edit the script code itself: **Deploy → Manage deployments →
edit → New version**, so the same `/exec` URL keeps working.
