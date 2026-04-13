
# Premium Cinematic Wedding Invitation Website

## Overview
A luxury digital wedding invitation with cinematic animations, emotional storytelling, and elegant design. The experience starts with an interactive envelope opening and flows into a full immersive wedding website.

## Design System
- **Colors**: Ivory (#FFFEF9), Champagne (#F7E7CE), Soft Gold (#D4AF37), White, Dark text (#2C1810)
- **Typography**: Playfair Display (serif) for names/headings, Inter for body text
- **Effects**: Glassmorphism cards, soft glows, floating petal particles, smooth scroll

## Sections & Features

### 1. Envelope Opening (Landing)
- Full-screen envelope with wax seal and gold couple initials
- Soft glowing romantic background with floating particles
- On click: wax seal cracks → envelope flap opens in 3D (CSS perspective) → invitation card slides out → transitions to main site
- All animated with Framer Motion

### 2. Hero Section
- Full-screen placeholder couple photo with slow cinematic zoom
- Large serif couple names + wedding date overlay
- Soft fade-in entrance animation

### 3. Cinematic Story Sections
- 3-4 full-screen sections with background photos
- Romantic text overlays ("Two souls, one journey", etc.)
- Parallax scroll + fade transitions between sections

### 4. Event Details
- Glassmorphism cards with wedding date, time, venue
- Google Maps button
- Elegant layout with gold accents

### 5. Photo Gallery
- Grid layout with hover animations
- Click to expand in lightbox modal
- Mobile swipe support via touch gestures

### 6. RSVP Form
- Fields: Name, Attendance (Yes/No), Number of guests, Message
- Validated with proper styling
- Beautiful confetti/heart success animation on submit

### 7. Contact Section
- WhatsApp buttons for bride & groom
- Clean, minimal layout

### 8. Global Features
- Mouse glow cursor effect (desktop)
- Floating petal particles throughout
- Music toggle button (ambient romantic track)
- Smooth scroll behavior
- Fully mobile-responsive with lighter animations on mobile

## Technical Approach
- Framer Motion for all animations (envelope, parallax, fades, gallery)
- CSS 3D transforms for envelope flap
- Intersection Observer via Framer Motion's `whileInView` for scroll-triggered animations
- Placeholder images (gradient/SVG) for couple photos — user can replace later
- Local state for RSVP (toast on submit, no backend)
