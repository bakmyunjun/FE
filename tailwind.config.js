export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h1: ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        h2: ['32px', { lineHeight: '40px', letterSpacing: '-0.02em' }],
        h3: ['24px', { lineHeight: '30px', letterSpacing: '-0.02em' }],

        sub1: ['18px', { lineHeight: '22px', letterSpacing: '-0.02em' }],
        sub2: ['16px', { lineHeight: '20px', letterSpacing: '-0.02em' }],

        body1: ['16px', { lineHeight: '24px', letterSpacing: '-0.02em' }],
        body2: ['14px', { lineHeight: '20px', letterSpacing: '-0.02em' }],

        caption: ['12px', { lineHeight: '16px', letterSpacing: '-0.02em' }],
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
