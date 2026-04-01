# Netlify Deployment — How we manage it (replicable)

## Overview

This document describes how this repository is deployed to Netlify and gives step-by-step instructions an automated agent can follow to replicate the same deployment for another site.

## Project specifics

- Site type: Static HTML site (top-level `index.html`, `assets/`, `css/`, `js/`).
- Build: None required for current repo. If you later add a static site generator, add the build command in Netlify settings or `netlify.toml`.
- Production branch: the repository's default branch (usually `main`) — confirm before connecting.
- Publish directory: the repository root (set to `.` or the folder containing `index.html`).

## Quick summary

1. Add optional `netlify.toml` or `_redirects` to repo root.
2. In Netlify: New site from Git → select repository.
3. Set Build Settings: Branch = `main`, Build command = (blank), Publish directory = `.`.
4. Add environment variables if required.
5. Deploy and verify.

## Detailed steps (Netlify UI)

1. Sign in to https://app.netlify.com.
2. Choose **Add new site → Import from Git**.
3. Select your Git provider (GitHub/GitLab/Bitbucket) and authorize Netlify if needed.
4. Select the repository for this project.
5. Configure build options:
   - Branch to deploy: `main` (or your production branch)
   - Build command: leave blank for this static repo (or set e.g. `npm run build` for SSGs)
   - Publish directory: `.` (or the directory containing `index.html`)
6. In **Site settings → Build & deploy → Environment**, add any required environment variables used by the site.
7. Click **Deploy site**. Netlify will create an initial deploy and provide a live URL.

## Using Netlify CLI (scriptable / agent-friendly)

Install the CLI and log in:

```bash
npm install -g netlify-cli
netlify login
```

Create or link a site, then deploy:

```bash
# interactive: creates or links a site
netlify init

# create a new site non-interactively (optional name)
netlify sites:create --name my-site-name

# link to an existing site by id
netlify link --id <site-id>

# preview deploy
netlify deploy --dir=.

# production deploy
netlify deploy --prod --dir=.
```

Set environment variables from the CLI if desired:

```bash
netlify env:set VAR_NAME "value"
netlify env:list
```

Notes:
- The `--dir` path should point to the folder that contains `index.html` (here `.`).

## Recommended repo config (`netlify.toml` example)

Place this `netlify.toml` in the repository root to ensure consistent settings across Netlify instances:

```toml
[build]
  publish = "."
  command = ""

[context.production.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Alternatively, a simple `_redirects` file in the repo root can be used:

```
/*    /index.html   200
```

## Domain & SSL

- Add a custom domain under **Site settings → Domain management → Custom domains**.
- Verify DNS: add the required A/CNAME records at your DNS provider or transfer DNS to Netlify.
- Netlify provisions Let's Encrypt certificates automatically; confirm HTTPS is active under **HTTPS** settings.

## Replicating this deployment for another website

Checklist for an agent replicating these settings on a new Netlify site:

1. Clone or copy the repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Ensure `netlify.toml` or `_redirects` is present in repo root (copy from this repo if needed).
3. On Netlify: **Add new site → Import from Git**, select the repo.
4. Use the same build settings: Branch = `main`, Build command = (same as source), Publish directory = `.`.
5. Copy environment variables from the source site (Site settings → Build & deploy → Environment).
6. Deploy and verify site loads, SSL is active, and assets return 200.

## Verification checklist

- Confirm site is reachable (open assigned URL).
- Confirm HTTPS is active.
- Confirm `index.html` loads without 404s and assets resolve correctly.
- Check Netlify deploy logs for successful build/publish steps.

## Troubleshooting (common issues)

- 404 pages: check `publish` directory — it must contain `index.html`.
- Missing assets: verify relative paths and that the publish directory includes `assets/`, `css/`, `js/`.
- Build failures: run your build locally and verify Node/npm versions match Netlify build image or pin Node via `engines` or `NODE_VERSION` env var.
- Env vars not present in deploy: set them in Netlify UI or via `netlify env:set`.

## Advanced tips

- Use Netlify deploy contexts (`[context.production]`, `[context.deploy-preview]`) in `netlify.toml` to alter behavior per-branch.
- Add `_headers` or `headers` section in `netlify.toml` to control caching and security headers.
- Use Netlify webhooks or API to trigger automated cross-site replication if you manage multiple sites programmatically.

---

If you want, I can also add the `netlify.toml` and a `_redirects` file to this repository now, and/or run the Netlify CLI flow to create and link a site.
