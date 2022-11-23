/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                custom: {
                    white: "#FFF4CF",
                    blue: "#277BC0",
                    yellow: "#FFB200",
                    lightyellow: "#FFCB42",
                },
            },
        },
    },
    plugins: [],
};
