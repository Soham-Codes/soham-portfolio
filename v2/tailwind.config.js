/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#19747E', // Dark Cyan
                secondary: '#A9D6E5', // Light Blue
                accent: '#D1E8E2', // Soft Mint Green
                background: '#E2E2E2', // Platinum
                surface: '#FFFFFF', // White
                text: '#0F172A', // Dark Slate
            }
        },
    },
    plugins: [],
}
