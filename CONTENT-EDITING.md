# Editing Nord Werk content (Decap CMS admin panel)

You can edit **Shop by Car** and **Goods / Parts** from a friendly admin at
`https://YOURSITE/admin` — no code. Changes save to GitHub and the site
redeploys automatically.

It needs 3 one-time setup steps (they require your own accounts):

## 1) Put the project on GitHub
- Create an empty repo on github.com (e.g. `nordwerk`).
- Push this folder to it (Claude can run `git init` + the first commit for you).

## 2) Host on Netlify (free, easiest login)
- netlify.com → **Add new site → Import an existing project → GitHub → nordwerk**.
- Build command: *(none)*. Publish directory: `/` (root). Deploy.
- (Optional) add your custom domain.

## 3) Turn on the editor login
In your Netlify site dashboard:
- **Identity → Enable Identity**
- **Identity → Services → Git Gateway → Enable**
- **Identity → Invite users →** invite your email → accept the email, set a password.

(Optional, nicer invite flow) add this before `</body>` in `index.html`:
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", u => {
      if (!u) window.netlifyIdentity.on("login", () => { document.location.href = "/admin/"; });
    });
  }
</script>
```

## Then: edit any time
Go to `https://YOURSITE/admin` → log in → **Shop → Shop by Car** (or **Goods / Parts**)
→ add/edit/reorder items, upload photos → **Publish**. Live in ~1 minute.

---

### Files involved
- `admin/index.html`, `admin/config.yml` — the CMS.
- `data/cars.json` — the Shop-by-Car list (the site reads this).
- `data/goods.json` — the goods list.
- `Asset/uploads/` — where CMS-uploaded photos go.

### Hosting on GitHub Pages instead of Netlify?
Possible, but login is harder (needs a GitHub OAuth proxy). See the commented
`github` backend in `admin/config.yml`. Netlify is strongly recommended for Decap.
