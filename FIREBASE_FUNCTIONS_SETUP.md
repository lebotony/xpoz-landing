# Firebase Cloud Functions Setup Guide

This guide will help you set up and deploy Firebase Cloud Functions to automatically update the Top 3 Models chart.

## What These Functions Do

1. **`updateTopModelsCache`** - Automatically triggered whenever a document is created, updated, or deleted in the `xpoz-landing` collection. It recalculates the top 3 models and updates the cache.

2. **`refreshTopModelsCache`** - HTTP callable function for manually refreshing the cache (useful for initial setup or manual updates).

## Prerequisites

- Node.js 18 or higher installed
- Firebase CLI installed globally
- Firebase project with Firestore enabled
- Billing enabled on your Firebase project (Cloud Functions requires Blaze plan)

## Step 1: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

## Step 3: Initialize Firebase in your project

From the project root directory:

```bash
firebase init
```

When prompted:
- Select **Functions** (use space to select, enter to confirm)
- Choose **Use an existing project** and select your Firebase project
- Select **TypeScript** as the language
- Choose **Yes** for ESLint
- Choose **No** for overwriting existing files (we've already created them)
- Choose **Yes** to install dependencies now

**Note:** The functions directory and files are already created, so you can skip most prompts or say "No" to overwriting.

## Step 4: Install Function Dependencies

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
```

## Step 5: Build the Functions

From the functions directory:

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `lib` folder.

## Step 6: Deploy the Functions

From the project root or functions directory:

```bash
firebase deploy --only functions
```

This will deploy both functions:
- `updateTopModelsCache` - Firestore trigger function
- `refreshTopModelsCache` - HTTP callable function

## Step 7: Initial Cache Population

After deployment, you can manually trigger the cache update using the Firebase Console or by calling the function:

### Option A: Using Firebase Console
1. Go to Firebase Console → Firestore
2. Manually add/edit a document in the `xpoz-landing` collection
3. The `updateTopModelsCache` function will automatically trigger

### Option B: Using Firebase Functions Call (from your app)

Add this helper function to your app to manually refresh:

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const refreshCache = httpsCallable(functions, 'refreshTopModelsCache');

// Call this function to manually refresh the cache
refreshCache()
  .then((result) => {
    console.log('Cache refreshed:', result.data);
  })
  .catch((error) => {
    console.error('Error refreshing cache:', error);
  });
```

### Option C: Using Firebase CLI

```bash
firebase functions:call refreshTopModelsCache
```

## Monitoring

### View Function Logs

```bash
firebase functions:log
```

Or view logs in Firebase Console → Functions → Logs

### Test Locally (Optional)

You can test functions locally using the Firebase Emulator:

```bash
# From functions directory
npm run serve
```

This starts the emulator suite. You'll need to update your app to point to the emulator for testing.

## How It Works

1. **Automatic Updates**: Whenever someone submits their email and model name through the form, the `updateTopModelsCache` function automatically triggers.

2. **Aggregation**: The function:
   - Fetches all documents from `xpoz-landing`
   - Counts how many times each model name appears (case-insensitive)
   - Sorts by count (descending)
   - Takes the top 3 models

3. **Cache Storage**: Results are stored in `cached-data/top-models` document:
   ```json
   {
     "models": [
       { "name": "bella", "count": 5 },
       { "name": "rosey", "count": 3 },
       { "name": "skylar", "count": 2 }
     ],
     "lastUpdated": "2026-01-22T...",
     "totalSubmissions": 10
   }
   ```

4. **Real-time Updates**: The TopModelsChart component listens to this cached document and updates instantly when it changes.

## Cost Optimization

Cloud Functions are efficient for this use case:
- Function only runs when data changes (not on every page load)
- Firestore reads are minimized (1 cache document read per page load vs. reading entire collection)
- For production with high traffic, consider adding rate limiting

## Troubleshooting

### Function not deploying?
- Make sure you're on the Firebase Blaze (pay-as-you-go) plan
- Check Node.js version: `node --version` (should be 18+)
- Rebuild functions: `cd functions && npm run build`

### Function not triggering?
- Check function logs: `firebase functions:log`
- Verify the collection name is exactly `xpoz-landing`
- Test manually with the `refreshTopModelsCache` function

### Cache not updating?
- Check Firestore rules allow writing to `cached-data` collection
- Verify function has proper permissions (should be automatic with Admin SDK)

## Updating Functions

When you make changes to the function code:

```bash
cd functions
npm run build
firebase deploy --only functions
```

To deploy a specific function:

```bash
firebase deploy --only functions:updateTopModelsCache
```

## Security Rules

The Cloud Functions use the Firebase Admin SDK, which bypasses security rules. However, for client-side reads, ensure your Firestore rules allow reading the cache:

```javascript
// firestore.rules
match /cached-data/{document=**} {
  allow read: if true;  // Public read for cache data
  allow write: if false; // Only Cloud Functions can write
}
```

## Next Steps

After deployment:
1. Submit a few test models through the form
2. Check the Firebase Console → Firestore → `cached-data/top-models` to verify the document is created
3. Verify the chart on your website updates automatically
4. Monitor function logs for any errors

🎉 Your Cloud Functions are now set up and will automatically maintain the Top 3 Models chart!
