const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/pages/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
        },
        extend: {
            colors:{
                white: "#FFFFFF",
                white_smoke: "#D9D9D9",
                emov_green: "#10E5B2",
                electric_violet: "#683CE4",
                violet: "#290F4B",
                support_violet: "#342844",
                support_violet_2: "#211432",
                support_grape: "#4B4059",
                table_bg: "#17121F",
                table_header: "#27203D",
                table_row: "#2C2D42"
            }
        },
    },
    plugins: [],
});