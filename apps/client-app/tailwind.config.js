const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "media",
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    safelist: [
        'object-none',
        'object-contain',
        'object-cover',
        'object-fill',
        'object-none',
        'object-scale-down'
    ],
    theme: {
        extend: {
            colors: {
                black: colors.black,
                white: colors.white,
                success: colors.emerald,
                warning: colors.orange,
                error: colors.red,
                primary: {
                    50: "#ffe5e6",
                    100: "#ffccce",
                    200: "#ff999d",
                    300: "#ff666c",
                    400: "#ff333b",
                    500: "#e60009",
                    600: "#cc0008",
                    700: "#990006",
                    800: "#660004",
                    900: "#330002",
                    950: "#1a0001"
                },
                secondary: {
                    50: "#e6f4fe",
                    100: "#cde9fe",
                    200: "#9bd2fd",
                    300: "#69bcfc",
                    400: "#38a6fa",
                    500: "#0690f9",
                    600: "#0573c7",
                    700: "#034c84",
                    800: "#023964",
                    900: "#011d32",
                    950: "#010e19"
                },
                neutral: {
                    50: "#f3f2f2",
                    100: "#e6e5e5",
                    200: "#cecaca",
                    300: "#b5b0b0",
                    400: "#9d9595",
                    500: "#847b7b",
                    600: "#6a6262",
                    700: "#454040",
                    800: "#353131",
                    900: "#1a1919",
                    950: "#0d0c0c"
                },
            }
        },
    },
    plugins: [],
};
