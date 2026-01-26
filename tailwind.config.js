/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Base
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // UI Colors
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Neon Colors - Retro 80s Synthwave
        neon: {
          pink: 'hsl(var(--neon-pink))',
          cyan: 'hsl(var(--neon-cyan))',
          purple: 'hsl(var(--neon-purple))',
          blue: 'hsl(var(--neon-blue))',
          orange: 'hsl(var(--neon-orange))',
          yellow: 'hsl(var(--neon-yellow))',
        },

        // Sunset Gradient Colors
        sunset: {
          1: 'hsl(var(--sunset-1))',
          2: 'hsl(var(--sunset-2))',
          3: 'hsl(var(--sunset-3))',
          4: 'hsl(var(--sunset-4))',
          5: 'hsl(var(--sunset-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'glow-pulse': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'float-slow': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-30px) rotate(5deg)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'gradient-shift': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'text-flicker': {
          '0%, 100%': {
            opacity: '1',
          },
          '33%': {
            opacity: '0.9',
          },
          '66%': {
            opacity: '0.95',
          },
        },
        scanline: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(100vh)',
          },
        },
        'border-glow': {
          '0%, 100%': {
            borderColor: 'hsl(var(--neon-pink))',
            boxShadow: '0 0 5px hsl(var(--neon-pink) / 0.5), 0 0 20px hsl(var(--neon-pink) / 0.3)',
          },
          '33%': {
            borderColor: 'hsl(var(--neon-cyan))',
            boxShadow: '0 0 5px hsl(var(--neon-cyan) / 0.5), 0 0 20px hsl(var(--neon-cyan) / 0.3)',
          },
          '66%': {
            borderColor: 'hsl(var(--neon-purple))',
            boxShadow:
              '0 0 5px hsl(var(--neon-purple) / 0.5), 0 0 20px hsl(var(--neon-purple) / 0.3)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'text-flicker': 'text-flicker 4s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
        'border-glow': 'border-glow 4s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(hsl(var(--neon-purple) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-purple) / 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sunset-gradient':
          'linear-gradient(180deg, hsl(var(--sunset-1)), hsl(var(--sunset-2)), hsl(var(--sunset-3)), hsl(var(--sunset-4)), hsl(var(--sunset-5)))',
        'neon-glow':
          'radial-gradient(ellipse at center, hsl(var(--neon-pink) / 0.15), transparent 70%)',
      },
      boxShadow: {
        'neon-pink':
          '0 0 5px hsl(var(--neon-pink) / 0.5), 0 0 20px hsl(var(--neon-pink) / 0.3), 0 0 40px hsl(var(--neon-pink) / 0.1)',
        'neon-cyan':
          '0 0 5px hsl(var(--neon-cyan) / 0.5), 0 0 20px hsl(var(--neon-cyan) / 0.3), 0 0 40px hsl(var(--neon-cyan) / 0.1)',
        'neon-purple':
          '0 0 5px hsl(var(--neon-purple) / 0.5), 0 0 20px hsl(var(--neon-purple) / 0.3), 0 0 40px hsl(var(--neon-purple) / 0.1)',
        glow: '0 0 20px hsl(var(--neon-pink) / 0.4)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
