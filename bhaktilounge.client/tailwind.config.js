/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ffc107",
            },
            minWidth: {
                192: "768px",
            },
            width: {
                192: "768px",
                320: "1280px",
            },
            maxHeight:{
                95:"80vh"
            }
        },
    },
    plugins: [],
};
