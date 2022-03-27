module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tadaa: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        tadaa: 'tadaa 4s steps(22,end) forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
