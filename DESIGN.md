# Design Brief

## Tone & Differentiation
Premium minimalism with intentional depth. Bold gradient accents on interactive elements only (CTAs, hover states). High contrast text on dark backgrounds. Choreographed entrance animations on scroll. Distinctive use of modern typography hierarchy to guide attention.

## Color Palette (OKLCH)

| Role | Light | Dark |
|------|-------|------|
| Background | `0.99 0 0` (white) | `0.12 0 0` (deep charcoal) |
| Foreground | `0.15 0 0` (near-black) | `0.95 0 0` (white) |
| Card | `1.0 0 0` (white) | `0.16 0 0` (card grey) |
| Primary (Accent) | `0.35 0 0` (dark) | `0.72 0.2 263` (cyan-purple gradient) |
| Secondary | `0.95 0 0` (light grey) | `0.2 0 0` (dark grey) |
| Border | `0.9 0 0` (light grey) | `0.25 0 0` (subtle grey) |
| Destructive | `0.55 0.22 25` (red) | `0.65 0.19 22` (warm red) |

## Typography
**Display**: Bricolage Grotesque (bold, modern, distinctive) — hero section, section titles  
**Body**: DM Sans (neutral, high readability) — all body copy, form labels  
**Mono**: Geist Mono (clean code appearance) — code blocks, tech details  

## Shape Language
Rounded corners: 12px (cards, buttons, inputs) | Flat edges: navigation, structural dividers | Elevation through shadows and gradients, not borders

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Hero | Full viewport, dark background with gradient accent CTA, large typography |
| Services | 4-column grid (md: 2-column), card-based with icon, title, description. No border, subtle shadow on hover. |
| Portfolio | 3-column grid (md: 2, sm: 1), project cards with image, title, tags. Card hover: lift 4px, shadow-elevated. |
| Testimonials | 3-column grid (md: 2, sm: 1), client photo, name, quote. Minimal styling, high contrast text. |
| Contact | Form centered, accent gradient on submit button. Email/phone/social icons below. |
| Footer | Dark background, minimal social links and copyright. |

## Component Patterns
- **Buttons**: Gradient primary for CTAs (`.btn-gradient`), secondary outline for secondary actions
- **Cards**: Minimal border, hover: lift 4px with shadow-elevated (`.card-hover`)
- **Forms**: Minimal styling, dark input backgrounds, white text, focus: ring accent
- **Icons**: Lucide-react, 24px default, accent color on hover/active
- **Links**: Underline on hover, gradient text for accent links (`.text-gradient`)

## Motion & Animations
- **Entrance**: Fade-in (0.5s) or slide-up (0.6s) on scroll for cards
- **Hover**: Scale-in on buttons (0.5s), lift on cards (0.3s cubic-bezier)
- **Transitions**: All smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1) (`transition-smooth`)
- **No bounce**: Keep animations purposeful, avoid excessive motion

## Spatial Density
- **Header**: Compact (64px), navigation minimal
- **Content sections**: 5rem spacing (80px) between sections on desktop, 3rem on mobile
- **Card padding**: 1.5rem (24px) for consistency
- **Grid gaps**: 1.5rem cards/services, 2rem portfolio/testimonials

## Constraints
- Fast loading: Web fonts cached, minimal animations on mobile
- SEO structure: Semantic HTML (h1, h2, section, article, nav)
- Accessibility: AA+ contrast, alt text on images, focus states on all interactive elements
- Dark mode only: No light mode toggle (design committed to dark theme)

## Signature Detail
Gradient accent only on CTAs and links—restrained use creates premium feel. Smooth choreographed animations guide user through portfolio without distraction. High-contrast typography hierarchy and minimal visual noise on dark background emphasizes content quality over decoration.
