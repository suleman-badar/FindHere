/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
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