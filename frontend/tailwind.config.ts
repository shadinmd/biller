import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"primary": "#3F488D",
				"custom-gray" :"#A2A2A2",
				"custom-offwhite": "#F5F5F5"
			},
		},
	},
	plugins: [],
};
export default config;