# Titan Pressure Control — Website

Custom-coded marketing site for Titan Pressure Control. Plain HTML/CSS/JavaScript, deployable to GitHub Pages or any static host. No build step, no dependencies, no framework.

---

## What's in this repo

```
titan-website/
├── index.html          ← Home page
├── products.html       ← Full product line (frac, wellheads, hoses, automation, flowback)
├── services.html       ← 4 services: Frac Watch, Torque & Test, Greasing, Valve Repair
├── about.html          ← Company story, values, leadership quote
├── locations.html      ← Midland HQ + Permian/Bakken/Rockies coverage
├── contact.html        ← Quote request form + contact info
├── resources.html      ← Placeholder ("coming soon")
├── careers.html        ← Placeholder ("now hiring")
├── css/
│   └── styles.css      ← All styling (single file, design tokens at top)
├── js/
│   └── main.js         ← Mobile menu toggle, contact form handler
└── assets/
    └── Titan_Pressure_Control_Brochure.pdf
```

---

## Deploy to GitHub Pages

### 1. Create the GitHub repo

```bash
# In your terminal, navigate to the folder containing this site
cd path/to/titan-website

# Initialize git
git init
git add .
git commit -m "Initial commit — Titan Pressure Control site v1"

# Create a new repository on GitHub (via the GitHub website)
# Name suggestion: titan-pressure-control or titanpressurecontrol-site
# Make it PUBLIC (required for free GitHub Pages on personal accounts; private requires GitHub Pro)

# Then connect it
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo on github.com
2. Click **Settings** (top right of the repo nav)
3. Click **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Branch: select `main` and folder `/ (root)`
6. Click **Save**
7. Wait ~1–2 minutes. Refresh the page. You'll see a banner: "Your site is live at `https://YOUR_USERNAME.github.io/REPO_NAME/`"

### 3. Connect titanpressurecontrol.com (custom domain)

In your repo Settings → Pages:

1. Under **Custom domain**, enter `titanpressurecontrol.com`
2. Click **Save**
3. GitHub creates a `CNAME` file in your repo automatically
4. **DO NOT check "Enforce HTTPS" yet** — wait until DNS propagates (Step 4)

In your **Namecheap account**:

1. Go to Domain List → click **Manage** next to titanpressurecontrol.com
2. Click the **Advanced DNS** tab
3. Delete any existing A or CNAME records (note: keep your MX records for Google Workspace email — only delete records pointing the website to anything else)
4. Add the following **A records** (Host: @, Value: each IP, TTL: Automatic):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. Add a **CNAME record** (Host: www, Value: `YOUR_USERNAME.github.io.`, TTL: Automatic)
6. Save changes

### 4. Wait for DNS, then enable HTTPS

DNS propagation usually takes 10 minutes to a few hours. You can check status:
- Visit https://www.whatsmydns.net/ and search for `titanpressurecontrol.com` → A record. When all entries show GitHub IPs (185.199.x.x), DNS is propagated.

Once propagated:
1. Return to GitHub repo → Settings → Pages
2. Check **Enforce HTTPS**
3. GitHub provisions an SSL certificate (takes ~5-15 minutes)

Site is live.

---

## How to make edits

### Editing text content

Each page is a single `.html` file. Open it in any text editor (VS Code recommended). Find the text you want to change, change it, save, commit, push:

```bash
git add .
git commit -m "Update services page"
git push
```

GitHub Pages re-publishes automatically within 1-2 minutes.

### Adding the real Titan logo

1. Save your logo PNG (chrome wordmark) as `assets/titan-logo.png`
2. In each `.html` file, find this block in the header:
   ```html
   <span class="nav-logo-text">TITAN<small>PRESSURE CONTROL</small></span>
   ```
3. Replace with:
   ```html
   <img src="assets/titan-logo.png" alt="Titan Pressure Control">
   ```
4. Test: the logo should be ~48px tall in the header. Adjust in `css/styles.css` under `.nav-logo img` if needed.

### Adding the real hero photo

1. Save your hero image (e.g., the frac stack/lightning shot from the brochure cover) as `assets/hero.jpg`
2. In `index.html`, find:
   ```html
   <div class="hero-bg" style="background-image: linear-gradient(135deg, ...);"></div>
   ```
3. Replace with:
   ```html
   <div class="hero-bg" style="background-image: url('assets/hero.jpg');"></div>
   ```

### Connecting the contact form to email

Currently the form opens the user's email client (mailto:). To make it post directly to a real email inbox, sign up at [Formspree](https://formspree.io/) (free 50 submissions/month) or [Web3Forms](https://web3forms.com/) (free):

1. Get your form endpoint URL (e.g., `https://formspree.io/f/your_form_id`)
2. In `contact.html`, find `<form>` and change to:
   ```html
   <form action="https://formspree.io/f/your_form_id" method="POST">
   ```
3. In `js/main.js`, comment out or remove the `e.preventDefault()` and the mailto fallback. Form will then post directly to your endpoint.

### Updating colors

All colors are defined as CSS variables at the top of `css/styles.css`:

```css
:root {
  --titan-red: #C8201F;
  --titan-red-hover: #9E1818;
  --titan-black: #0A0A0A;
  /* ... */
}
```

Change these once and they propagate site-wide.

---

## Known placeholders to swap before launch

These are flagged as TODO items in the code — find and replace as content becomes available:

- [ ] Real Titan logo PNG → `assets/titan-logo.png`
- [ ] Real hero background photo → `assets/hero.jpg` (the frac stack/lightning brochure cover image is a strong candidate)
- [ ] Real Nathaniel Harris headshot → replace the "NH" silhouette div on Home and About pages
- [ ] Real Titan equipment photography → currently no product images displayed; can be added inline later
- [ ] Customer testimonials (need permission to publish)
- [ ] Customer logos for trust strip (need permission)
- [ ] Real safety stats (TRIR, EMR) once available
- [ ] 2-3 anonymized case studies for Resources page
- [ ] Open job postings for Careers page
- [ ] Connect contact form to Formspree or Web3Forms
- [ ] Update Google Maps listing for 12620 TX-191 (currently shows McClinton/SWECO)
- [ ] Confirm Bakken footprint is operationally accurate
- [ ] Set up 301 redirects from `mcclintonenergy.com` → `titanpressurecontrol.com` at launch

---

## Tech specs

- **No frameworks** — vanilla HTML, CSS, JS
- **No build step** — files are served as-is
- **Fonts** — Google Fonts: Big Shoulders Display (display) + Manrope (body)
- **Responsive breakpoints** — 768px (tablet), 1024px (desktop)
- **Browser support** — all modern browsers (Chrome, Safari, Firefox, Edge from 2020+)
- **Performance** — should achieve 95+ Lighthouse score with hero photo optimized
- **Accessibility** — semantic HTML, ARIA labels on nav, keyboard-navigable, sufficient contrast ratios
- **SEO basics** — page-specific titles, meta descriptions, Open Graph tags, semantic structure

---

## Local preview before pushing

To view changes locally before committing, you can use any simple HTTP server:

```bash
# If you have Python installed (most Macs do)
cd titan-website
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Or use VS Code's "Live Server" extension — right-click `index.html` → "Open with Live Server."

---

## Questions / Issues

This is v1 — built for stakeholder feedback. After feedback, we iterate with real photography, testimonials, case studies, and refinements.

Brand assets, voice, and content decisions are documented in the project notes. The codebase is intentionally simple: anyone with basic HTML/CSS knowledge can make routine updates.
