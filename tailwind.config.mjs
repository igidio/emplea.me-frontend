export default {
	darkMode: "class",
	theme: {
		screens: {
			tablet: "575px",
			desktop: "720px",
		},
		fontFamily: {
			sans: ["Poppins", "Helvetica", "Arial"],
		},
		fontSize: {
			sm: "0.625rem", // 10px
			//base: "0.875rem", // 14px
			base: "0.75rem", // 14px
			xl: "1.125rem", // 18px
			"2xl": "1.25rem", //20px
			"3xl": "1.5rem", // 24px
			"4xl": "1.875rem", // 30px
			"5xl": "2.25rem", // 36px
			"6xl": "3rem", // 48px
		},
		borderRadius: {
			small: "4px",
			medium: "8px",
			large: "16px",
			full: "9999px;",
		},
		extend: {
			colors: {
				violet: {
					50: "#F3F2FF",
					100: "#EAE7FF",
					200: "#D7D2FF",
					300: "#BAAEFF",
					400: "#9780FF",
					500: "#774DFF",
					600: "#6627FF",
					700: "#5916EB",
					800: "#4A12C5",
					900: "#3E11A1",
					950: "#23076E",
				},
				gray: {
					50: "#F6F6F6",
					100: "#EFEFEF",
					200: "#DCDCDC",
					300: "#BDBDBD",
					400: "#989898",
					500: "#7C7C7C",
					600: "#656565",
					700: "#525252",
					800: "#464646",
					900: "#3D3D3D",
					900: "#292929",
				},
				pink: {
					50: "#FEF2F4",
					100: "#FEE5E9",
					200: "#FBD0D8",
					300: "#F8A9B9",
					400: "#F8A9B9",
					500: "#EA4972",
					600: "#D6285C",
					700: "#B41C4D",
					800: "#971A46",
					900: "#821942",
					900: "#480920",
				},
				yellow: {
					50: "#FFFFE7",
					100: "#FEFFC1",
					200: "#FFFD86",
					300: "#FFF341",
					400: "#FFE40D",
					500: "#FFD500",
					600: "#D19C00",
					700: "#A67002",
					800: "#89570A",
					900: "#74470F",
					900: "#442504",
				},
			},
		},
	},
};
