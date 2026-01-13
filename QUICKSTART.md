# Quick Start Guide

Get your XPOZ.ME landing page up and running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- Firebase account (free tier is fine)
- WhatsApp Business account (optional)

## 🚀 Quick Setup

### 1. Install Dependencies (1 min)

```bash
cd landing-page
npm install
```

### 2. Setup Firebase (2 mins)

**Create Firebase Project:**
1. Visit [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add project" → Name it "xpoz-landing"
3. Disable Analytics → Click "Create project"

**Enable Firestore:**
1. Click "Firestore Database" → "Create database"
2. Select "Production mode" → Choose location → "Enable"

**Get Your Credentials:**
1. Click the gear icon → "Project settings"
2. Scroll to "Your apps" → Click web icon `</>`
3. Register app → Copy the config object

### 3. Configure Environment (1 min)

```bash
# Copy the example file
cp .env.example .env

# Edit .env and paste your Firebase credentials
nano .env  # or use any text editor
```

Your `.env` should look like:
```env
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=xpoz-landing.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=xpoz-landing
REACT_APP_FIREBASE_STORAGE_BUCKET=xpoz-landing.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Update WhatsApp Link (30 sec)

Open `src/components/Waitlist.tsx` and update:

```typescript
const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/YOUR_CHANNEL_ID';
```

### 5. Launch! (10 sec)

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✅ Verify Everything Works

1. **Hero Section**: Should see animated blobs and "XPOZ.ME" title
2. **Features**: Six feature cards with hover effects
3. **Waitlist Form**: Enter email and submit
4. **Check Firebase**: Go to Firestore Console → `waitlist` collection
5. **WhatsApp Button**: Click and verify it opens your channel

## 🚀 Deploy to Production

### Vercel (Easiest - 2 mins)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts, done! 🎉

### Netlify (Drag & Drop)

```bash
# Build
npm run build

# Drag the 'build' folder to netlify.com/drop
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## 🎨 Customization

### Change Colors
Edit `src/styles/theme.ts`

### Update Content
- **Hero text**: `src/components/Hero.tsx`
- **Features**: `src/components/Features.tsx`
- **Footer links**: `src/components/Footer.tsx`

### Add Logo
Replace the 💋 emoji in:
- `src/components/Hero.tsx`
- `src/components/Footer.tsx`
- `public/index.html` (favicon)

## 📊 View Submissions

Go to [console.firebase.google.com](https://console.firebase.google.com)
→ Your Project → Firestore Database → `waitlist` collection

## 🐛 Troubleshooting

**"Permission denied" error:**
- Set Firestore rules (see FIREBASE_SETUP.md)

**Firebase not connecting:**
- Check `.env` file exists
- Verify credentials are correct
- Restart dev server: `npm start`

**Animations not working:**
- Hard refresh: Cmd/Ctrl + Shift + R
- Clear cache and reload

**Build fails:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Run `npm run build`

## 📚 Full Documentation

See `README.md` and `FIREBASE_SETUP.md` for detailed instructions.

## 🆘 Need Help?

- Check Firebase Console for errors
- Inspect browser console (F12)
- Review `FIREBASE_SETUP.md` for detailed setup
- Contact: support@xpoz.me

---

**That's it! You now have a production-ready landing page! 🚀**
