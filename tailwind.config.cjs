module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Ensure all your source files are included
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            keyframes: {
                modalDrop: {
                    '0%': { opacity: '0', transform: 'translateY(-40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                modalDrop: 'modalDrop 0.3s ease-out forwards',
            }
        }
    }
}
