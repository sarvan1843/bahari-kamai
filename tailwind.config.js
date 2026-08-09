/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8F4E00',
          container: '#FF9933',
          fixed: '#FFDCC2',
          'fixed-dim': '#FFB77A',
        },
        'on-primary': {
          DEFAULT: '#FFFFFF',
          container: '#693800',
        },
        secondary: {
          DEFAULT: '#056E00',
          container: '#8DFC75',
          'fixed-dim': '#72DE5C',
        },
        'on-secondary': {
          DEFAULT: '#FFFFFF',
          container: '#067500',
        },
        tertiary: {
          DEFAULT: '#705D00',
          container: '#D0AF00',
          fixed: '#FFE16D',
          'fixed-dim': '#E9C400',
        },
        'on-tertiary': {
          container: '#514300',
        },
        surface: {
          DEFAULT: '#F8F9FA',
          bright: '#F8F9FA',
          'container-lowest': '#FFFFFF',
          'container-low': '#F3F4F5',
          container: '#EDEEEF',
          'container-high': '#E7E8E9',
          'container-highest': '#E1E3E4',
          variant: '#E1E3E4',
          tint: '#8F4E00',
        },
        'on-surface': {
          DEFAULT: '#191C1D',
          variant: '#554336',
        },
        outline: {
          DEFAULT: '#887364',
          variant: '#DBC2B0',
        },
        error: {
          DEFAULT: '#BA1A1A',
          container: '#FFDAD6',
        },
      },
      fontFamily: {
        serif: ['Noto Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['32px', { lineHeight: '40px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.05em' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'container-margin': '20px',
        'gutter': '16px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(143, 78, 0, 0.08)',
        'card-lg': '0 12px 24px rgba(143, 78, 0, 0.15)',
        'warm': '0 8px 24px rgba(143, 78, 0, 0.08)',
        'nav': '0 -4px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
