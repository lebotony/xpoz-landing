# Quick Deploy Guide for Firebase Functions

## One-Time Setup (Do this first)

```bash
# 1. Install Firebase CLI globally (if not installed)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Install function dependencies
cd functions
npm install
cd ..
```

## Deploy Functions (Every time you update functions)

```bash
# From project root
firebase deploy --only functions
```

## Initial Setup - Populate the Cache

After deploying for the first time, you need to populate the cache. Choose one method:

### Method 1: Add a test record via your website
Just submit a model name through your website form, and the function will automatically create the cache.

### Method 2: Call the refresh function manually

```bash
firebase functions:call refreshTopModelsCache
```

## Deploy Everything (Functions + Hosting + Rules)

```bash
firebase deploy
```

## Useful Commands

```bash
# View function logs
firebase functions:log

# Deploy only specific function
firebase deploy --only functions:updateTopModelsCache

# Test functions locally (optional)
cd functions
npm run serve

# Rebuild functions after code changes
cd functions
npm run build
```

## Verify Deployment

1. Check Firebase Console → Functions
   - You should see `updateTopModelsCache` and `refreshTopModelsCache`

2. Submit a test model through your website

3. Check Firestore Console → `cached-data/top-models`
   - Document should be created/updated automatically

4. Check website - Top 3 Models chart should update in real-time

## Troubleshooting

**Functions not deploying?**
- Ensure you're on Firebase Blaze (pay-as-you-go) plan
- Run: `cd functions && npm run build`

**Chart not updating?**
- Check function logs: `firebase functions:log`
- Verify Firestore rules are deployed: `firebase deploy --only firestore:rules`
- Check browser console for errors

**Need help?**
See full documentation in `FIREBASE_FUNCTIONS_SETUP.md`
