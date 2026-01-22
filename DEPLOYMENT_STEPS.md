# Cloud Functions Deployment Steps

## Issue Found
The Firebase project needs to be initialized. Follow these steps:

## Step 1: Login to Firebase (if not already)
```bash
firebase login
```

## Step 2: Initialize or Connect Your Project

### Option A: If you have an existing Firebase project
```bash
cd /Users/learnndlovu/Desktop/xpoz-landing
firebase use --add
```
Then:
- Select your project from the list
- Give it an alias (e.g., "default")

### Option B: If you need to create a new project
```bash
firebase projects:list  # See all your projects
firebase use <your-project-id>
```

## Step 3: Verify Project Connection
```bash
firebase use
```
Should show your active project.

## Step 4: Deploy Functions
```bash
cd /Users/learnndlovu/Desktop/xpoz-landing
firebase deploy --only functions
```

## Step 5: Deploy Firestore Rules (Important!)
```bash
firebase deploy --only firestore:rules
```

## Step 6: Verify Deployment
1. Go to Firebase Console → Functions
2. You should see:
   - `updateTopModelsCache`
   - `refreshTopModelsCache`

## Step 7: Trigger Initial Cache Population

After deployment, manually trigger the cache refresh:

```bash
firebase functions:call refreshTopModelsCache
```

Or just submit a test entry through your website form.

## Step 8: Update TopModelsChart.tsx

Once functions are deployed and working:

1. Open `src/components/TopModelsChart.tsx`
2. Change line 8:
   ```typescript
   const USE_CACHE = true; // Changed from false
   ```
3. Rebuild and redeploy your website:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Troubleshooting

**Error: "No currently active project"**
- Run `firebase use --add` and select your project

**Error: "Missing permissions"**
- Make sure you're on the Blaze (pay-as-you-go) plan
- Firebase Console → Upgrade to Blaze plan

**Functions deployed but not working?**
- Check logs: `firebase functions:log`
- Verify Firestore rules are deployed
- Manually trigger: `firebase functions:call refreshTopModelsCache`

**Still seeing old data in chart?**
- Make sure `USE_CACHE = true` in TopModelsChart.tsx
- Check if the `cached-data/top-models` document exists in Firestore
- Clear browser cache

## Quick Commands Reference

```bash
# Check current project
firebase use

# View all projects
firebase projects:list

# Switch projects
firebase use <project-id>

# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only Firestore rules
firebase deploy --only firestore:rules

# View function logs
firebase functions:log

# Manually refresh cache
firebase functions:call refreshTopModelsCache
```

## What Your Firebase Project ID?

To find it:
1. Go to Firebase Console: https://console.firebase.google.com/
2. Click on your project
3. Click the gear icon (⚙️) → Project settings
4. Copy the "Project ID"

Then run:
```bash
firebase use <your-project-id>
```
