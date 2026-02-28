/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: '#10b981', // Emerald 500
                    dark: '#047857', // Emerald 700
                },
                card: '#1e293b', // Slate 800
                cardForeground: '#f8fafc',
            },
        },
    },
    plugins: [],
}
