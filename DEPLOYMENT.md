# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Quick Setup

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/njrun1804/castoff-covers`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Save the changes

### 2. Set Up API Key (Required for AI Features)

Since the app uses Google Gemini AI, you need to set up your API key as a GitHub Secret:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `GEMINI_API_KEY`
4. Value: Your Google Gemini API key
5. Click **Add secret**

**Get your API key:**
- Visit: https://aistudio.google.com/apikey
- Create a new API key if you don't have one

### 3. Deploy

#### Automatic Deployment (Recommended)

The site will automatically deploy whenever you push to the `main` branch. The GitHub Actions workflow will:
- Build the project
- Deploy to GitHub Pages at: `https://njrun1804.github.io/castoff-covers/`

#### Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### 4. Your Live Site URL

Once deployed, your site will be available at:
**https://njrun1804.github.io/castoff-covers/**

## Important Notes

- The base path is set to `/castoff-covers/` in `vite.config.ts` - this must match your repository name
- API keys are injected during build time from GitHub Secrets (not exposed in the repo)
- The first deployment may take a few minutes
- Subsequent deployments trigger automatically on push to `main`

## Troubleshooting

### Build fails with "API_KEY not found"
- Make sure you've added `GEMINI_API_KEY` as a repository secret
- Check that the secret name matches exactly: `GEMINI_API_KEY`

### Site shows 404
- Verify GitHub Pages is enabled with "GitHub Actions" as the source
- Check that the base path in `vite.config.ts` matches your repo name
- Wait a few minutes after deployment (GitHub Pages can take time to update)

### Assets not loading correctly
- Ensure `base: '/castoff-covers/'` in `vite.config.ts` matches your repository name
- Clear browser cache and try again


