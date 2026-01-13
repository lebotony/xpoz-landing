# XPOZ.ME Landing Page

A modern, ultra-sleek landing page for XPOZ.ME - the ultimate platform for adult content creators.

## Features

- 🎨 **Ultra-Modern Design** - Glassmorphism, gradient effects, and smooth animations
- 🔥 **Hero Section** - Eye-catching hero with animated blobs and compelling CTA
- ✨ **Features Showcase** - Beautiful grid layout highlighting key features
- 📧 **Waitlist Form** - Firebase-powered email/WhatsApp collection
- 📱 **WhatsApp Integration** - Direct link to WhatsApp channel
- 🎭 **Framer Motion** - Smooth, professional animations throughout
- 📱 **Fully Responsive** - Looks great on all devices
- 🚀 **Performance Optimized** - Fast loading and smooth interactions

## Tech Stack

- React 19
- TypeScript
- Styled Components
- Framer Motion
- Firebase (Firestore)
- Create React App

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd landing-page
   npm install
   ```

2. **Configure Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Firestore Database
   - Copy `.env.example` to `.env`
   - Add your Firebase credentials to `.env`

3. **Setup Firestore**
   - Go to Firestore Database in Firebase Console
   - Create a collection called `waitlist`
   - Set security rules:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /waitlist/{document=**} {
           allow write: if request.time < timestamp.date(2026, 12, 31);
           allow read: if false;
         }
       }
     }
     ```

4. **Update WhatsApp Channel Link**
   - Open `src/components/Waitlist.tsx`
   - Update the `WHATSAPP_CHANNEL` constant with your actual WhatsApp channel link

5. **Run Development Server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000)

6. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the 'build' folder to Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Color Scheme

The landing page uses the same color palette as the main XPOZ.ME app:

- **Primary**: `#FF4458` (Hot Pink)
- **Secondary**: `#00D4FF` (Cyan Blue)
- **Background**: `#0A0A0F` (Dark)
- **Surface**: `#1A1A24` (Card backgrounds)
- **Text**: `#FFFFFF` (White)

## Customization

### Change Colors
Edit `src/styles/theme.ts` to customize the color palette.

### Update Content
- Hero: `src/components/Hero.tsx`
- Features: `src/components/Features.tsx`
- Waitlist: `src/components/Waitlist.tsx`
- Footer: `src/components/Footer.tsx`

### Add New Sections
Create new components in `src/components/` and import them into `src/App.tsx`.

## Firebase Collection Structure

The waitlist entries are stored in Firestore with this structure:

```typescript
{
  email: string | null,
  whatsapp: string | null,
  timestamp: Timestamp
}
```

## Performance Tips

- Images are optimized and lazy-loaded
- Animations use GPU-accelerated transforms
- Code splitting is handled by Create React App
- Minimal bundle size with tree-shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - XPOZ.ME

## Support

For questions or issues, contact: support@xpoz.me
