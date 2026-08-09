---
name: Saffron Wealth
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#554336'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#887364'
  outline-variant: '#dbc2b0'
  surface-tint: '#8f4e00'
  primary: '#8f4e00'
  on-primary: '#ffffff'
  primary-container: '#ff9933'
  on-primary-container: '#693800'
  inverse-primary: '#ffb77a'
  secondary: '#056e00'
  on-secondary: '#ffffff'
  secondary-container: '#8dfc75'
  on-secondary-container: '#067500'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d0af00'
  on-tertiary-container: '#514300'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc2'
  primary-fixed-dim: '#ffb77a'
  on-primary-fixed: '#2e1500'
  on-primary-fixed-variant: '#6d3a00'
  secondary-fixed: '#8dfc75'
  secondary-fixed-dim: '#72de5c'
  on-secondary-fixed: '#012200'
  on-secondary-fixed-variant: '#035300'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  display-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

This design system embodies a "Modern Indian Premium" aesthetic, balancing the high-energy vibrancy of a financial earning platform with the sophisticated trust of traditional wealth management. The target audience is the ambitious, tech-savvy Indian demographic looking for reliable digital income.

The style is **Corporate / Modern** with a **Tactile** twist. It utilizes clean, high-white surfaces to ensure financial data remains legible, while incorporating subtle cultural motifs to create an emotional connection. The interface should feel optimistic, prosperous, and elite. Large touch targets and high-contrast elements prioritize accessibility for a wide range of users across various mobile devices.

## Colors

The palette is rooted in national identity but executed with a premium digital finish.

- **Royal Saffron (#FF9933):** Used for primary actions, progress indicators, and branding elements to evoke energy and ambition.
- **Emerald Green (#138808):** Reserved strictly for success states, earnings growth, and "Withdraw" or "Complete" actions to signal prosperity.
- **Rich Gold (#FFD700):** An accent color used for premium tiers, rewards, and high-value highlights.
- **Neutral Palette:** High-purity whites and very light cool-greys are used to maintain a clean, professional "fintech" environment, preventing the vibrant primary colors from becoming overwhelming.

## Typography

This design system uses a dual-font strategy to signal both heritage and modern efficiency. 

**Noto Serif** is used for major headlines and currency displays to provide a sense of established trust and premium quality. **Inter** is used for all functional UI elements, body text, and data points to ensure maximum readability and a technical, systematic feel. 

Large currency amounts (the "Earnings") should always use the Headline styles to stand out. Captions and small labels use an increased letter spacing for clarity on mobile screens.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for mobile-first consumption. 

- **Mobile (Default):** 4-column grid with 20px outside margins.
- **Tablet:** 8-column grid with 32px margins.
- **Desktop:** 12-column fixed grid (max-width 1200px).

The spacing rhythm is based on a 4px baseline. Components are grouped using "Outer Spacing" (24px) for distinct sections and "Inner Spacing" (12px or 16px) for content within cards. Decorative dividers featuring geometric paisley motifs should have at least 32px of vertical padding to act as clear section breaks.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**.

1.  **Level 0 (Background):** Neutral Light Grey (#F8F9FA).
2.  **Level 1 (Cards):** Pure White (#FFFFFF) with a very soft, large-radius shadow (Color: Primary mixed with 5% Black, Opacity: 8%, Blur: 12px, Y: 4px).
3.  **Level 2 (Active Elements):** Primary color surfaces or cards with a slightly tighter, more defined shadow to suggest interactability.

Backgrounds may feature "Watermark" patterns—low-opacity (2-3%) geometric Mandalas—placed behind main content containers to add texture without interfering with readability.

## Shapes

The shape language is **Rounded**, conveying a friendly and modern approachable feel. 

- **Standard Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Feature Cards:** 1rem (16px) corner radius.
- **Earnings Summary Card:** 1.5rem (24px) corner radius to differentiate it as the most important element on the screen.
- **Icons:** Encapsulated in circular or soft-squircle containers with a 20% opacity background of the icon's primary color.

## Components

- **Earnings Card:** The flagship component. High-contrast background (either Royal Saffron or a dark gradient). Uses Noto Serif for the balance amount. Includes a "Withdraw" button in Emerald Green.
- **Buttons:** Primary buttons are Royal Saffron with white text. Secondary buttons use a transparent background with a 1.5px Saffron border. All buttons have a minimum height of 48px for thumb-friendly accessibility.
- **Task Chips:** Small, rounded containers indicating task categories (e.g., "Surveys", "Games"). Use light tinted backgrounds (10% opacity) with high-saturation text.
- **Input Fields:** Outlined style using a light grey border that turns Royal Saffron on focus. Labels sit just above the field in Inter (Body-sm).
- **Progress Bars:** Thin, 8px tall bars. Background is a light grey; the fill is a gradient from Royal Saffron to Rich Gold.
- **Decorative Dividers:** Horizontal lines that fade out at the edges, featuring a small, centered geometric Mandala icon.