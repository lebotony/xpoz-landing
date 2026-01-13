# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `xpoz-landing`
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your App

1. In Firebase Console, click the web icon `</>`
2. Register app with nickname: `XPOZ Landing Page`
3. Don't check "Also set up Firebase Hosting"
4. Click "Register app"
5. Copy the `firebaseConfig` object

## Step 3: Enable Firestore

1. In Firebase Console sidebar, click "Firestore Database"
2. Click "Create database"
3. Select "Start in production mode"
4. Choose your location (closest to your users)
5. Click "Enable"

## Step 4: Configure Security Rules

1. Go to Firestore Database → Rules tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to waitlist (with basic validation)
    match /waitlist/{document=**} {
      allow write: if request.time < timestamp.date(2027, 1, 1)
                   && request.resource.data.keys().hasAny(['email', 'whatsapp']);
      allow read: if false; // No public reads
    }
  }
}
```

3. Click "Publish"

## Step 5: Add Firebase Config to Your App

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Firebase credentials from Step 2:
   ```
   REACT_APP_FIREBASE_API_KEY=AIzaSy...
   REACT_APP_FIREBASE_AUTH_DOMAIN=xpoz-landing.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=xpoz-landing
   REACT_APP_FIREBASE_STORAGE_BUCKET=xpoz-landing.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

## Step 6: Test Your Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Navigate to the waitlist section
4. Submit a test email
5. Check Firestore Console to see if the entry appears

## Step 7: View Waitlist Entries

1. Go to Firestore Database in Firebase Console
2. Navigate to the `waitlist` collection
3. You'll see all submissions with:
   - `email` field
   - `whatsapp` field (if provided)
   - `timestamp` field

## Optional: Export Waitlist Data

### Via Firebase Console
1. Go to Firestore → waitlist collection
2. Click the three dots menu
3. Select "Export collection"

### Via Code
Create a script to export data:

```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

async function exportWaitlist() {
  const querySnapshot = await getDocs(collection(db, 'waitlist'));
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(JSON.stringify(data, null, 2));
}
```

## Troubleshooting

### "Permission denied" Error
- Check your Firestore security rules
- Ensure you're within the timestamp limit

### Firebase not initializing
- Verify all environment variables are set correctly
- Check that `.env` file exists and is not in `.gitignore`
- Restart the development server after changing `.env`

### Submissions not appearing
- Check browser console for errors
- Verify Firebase credentials are correct
- Ensure Firestore is enabled in your project

## Security Best Practices

1. **Never commit `.env` to version control**
2. **Set timestamp limits** in security rules to prevent spam
3. **Add rate limiting** if you get too much traffic
4. **Monitor Firestore usage** to avoid unexpected bills
5. **Add email validation** on the backend if needed

## WhatsApp Channel Setup

1. Create a WhatsApp Channel
2. Get the channel invite link
3. Update `WHATSAPP_CHANNEL` constant in `src/components/Waitlist.tsx`
4. Test the link to ensure it works

## Next Steps

- Set up email notifications when someone joins
- Create an admin dashboard to view submissions
- Add analytics tracking
- Set up automated email responses
- Export data regularly for backup
