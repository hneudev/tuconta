/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#176BFF",
				accent: "#2ecc71",
				dark: "#1f2937",
			},
			fontFamily: {
				"noto-sans": ["var(--font-noto-sans)", "sans-serif"],
			},
		},
	},
	plugins: [],
};
