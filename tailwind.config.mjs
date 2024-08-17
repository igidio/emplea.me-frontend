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
			},
		},
	},
};
