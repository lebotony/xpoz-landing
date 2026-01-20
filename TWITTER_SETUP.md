# Twitter Confirmation Setup

## How It Works

When users join the waitlist:
1. ✅ Email is saved to Firebase (`xpoz-landing` collection)
2. ✅ Success message appears: "You're on the waitlist! Comment 'Joined' on X to confirm 👇"
3. ✅ After 2 seconds, Twitter opens automatically with your confirmation tweet

## Setting Up Your Tweet URL

### Option 1: Link to an Existing Tweet (Recommended)

1. **Create and post your tweet on X/Twitter:**
   ```
   🚀 XPOZ is coming

   Comment "Joined" to get early access

   🔔 Email waitlist is open
   ```

2. **Pin the tweet to your profile**

3. **Copy the tweet URL** (e.g., `https://twitter.com/YourHandle/status/1234567890`)

4. **Update the URL in `src/components/Waitlist.tsx` (line 219):**
   ```typescript
   const TWITTER_CONFIRMATION_TWEET = 'https://twitter.com/YourHandle/status/1234567890';
   ```

### Option 2: Pre-filled Tweet Composer (Current Setup)

The current setup opens Twitter with a pre-filled tweet. To customize:

1. Go to [Twitter Intent URL Generator](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)

2. Or manually edit line 219 in `src/components/Waitlist.tsx`:
   ```typescript
   const TWITTER_CONFIRMATION_TWEET = 'https://twitter.com/intent/tweet?text=YOUR_TEXT_HERE';
   ```

3. URL encode your tweet text:
   - Spaces: `%20`
   - Line breaks: `%0A`
   - Example: `XPOZ is coming` → `XPOZ%20is%20coming`

## Testing

1. Enter an email in your waitlist form
2. Click "Join Waitlist (comment to confirm)"
3. Success message should appear
4. After 2 seconds, Twitter should open
5. Check Firebase Console to verify email was saved

## Customization

### Change Redirect Timing

In `src/components/Waitlist.tsx` (line 246), adjust the timeout:
```typescript
setTimeout(() => {
  window.open(TWITTER_CONFIRMATION_TWEET, '_blank');
}, 2000); // Change 2000 to desired milliseconds (1000 = 1 second)
```

### Disable Auto-Redirect

Remove lines 245-248 to keep the success message without auto-opening Twitter.

### Change Button Text

Edit line 296 in `src/components/Waitlist.tsx`:
```typescript
<span>{loading ? 'Joining...' : 'Your Custom Text Here 🚀'}</span>
```
