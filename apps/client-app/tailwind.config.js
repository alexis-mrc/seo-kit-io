const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["selector", "htmlnever"],
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
                    50: "#e5f7ff",
                    100: "#ccf0ff",
                    200: "#99e1ff",
                    300: "#66d1ff",
                    400: "#33c2ff",
                    500: "#14b9ff",
                    600: "#008fcc",
                    700: "#006b99",
                    800: "#004866",
                    900: "#002433",
                    950: "#00121a"
                },
                secondary: {
                    50: "#f7e9fc",
                    100: "#eed3f8",
                    200: "#dea6f2",
                    300: "#c564e8",
                    400: "#bd4de5",
                    500: "#ac21de",
                    600: "#8a1ab2",
                    700: "#671485",
                    800: "#450d59",
                    900: "#22072c",
                    950: "#110316"
                },
                neutral: {
                    50: "#f3f2f2",
                    100: "#e6e5e6",
                    200: "#cdcbcd",
                    300: "#b4b1b3",
                    400: "#9b979a",
                    500: "#827d81",
                    600: "#686467",
                    700: "#4e4b4d",
                    800: "#343234",
                    900: "#1a191a",
                    950: "#0d0d0d"
                },
            }
        },
    },
    plugins: [],
};
