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
                    primary: "#422057",
                    secondary: "#FCF951",
                },
            },
        },
    },
    plugins: [],
};
