/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FFC107",
                primaryhover: "#FFD222",
                darkfont: "#374151",
                link:"rgb(29,78,216)"
            },
            minWidth: {
                192: "768px",
            },
            width: {
                192: "768px",
                320: "1280px",
            },
            maxHeight: {
                95: "80vh",
            },
        },
    },
    plugins: [],
};
