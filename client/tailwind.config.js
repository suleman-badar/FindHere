/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Theme tokens mapped to CSS variables defined in src/index.css
                primary: 'var(--color-primary)',
                'primary-dark': 'var(--color-primary-dark)',
                accent: 'var(--color-accent)',
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                text: 'var(--color-text)',
                muted: 'var(--color-muted)',
                border: 'var(--color-border)',

                // preserve legacy greys used in the project
                grey1: 'rgb(95, 86, 89)',
                grey2: 'rgb(113, 95, 93)',
                grey3: 'rgb(96, 87, 90)',
                grey4: 'rgb(98, 89, 92)',
                grey5: 'rgb(97, 88, 91)',
            },
        },
    },
    plugins: [],
}