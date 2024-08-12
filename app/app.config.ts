const primaryStateButton =
	"bg-violet-600 hover:bg-violet-500 active:bg-violet-800 disabled:bg-violet-200 text-white";
const centerTextButton = "text-center justify-center text-base";

export default defineAppConfig({
	icon: {
		size: "21px", // default <Icon> size applied
		class: "icon", // default <Icon> class applied
		mode: "css", // default <Icon> mode applied
	},
	ui: {
		primary: "violet",
		button: {
			base: "text-base",
			font: "font-semibold",
			color: {
				primary: {
					solid: primaryStateButton,
				},
			},
			default: {
				variant: "medium",
			},
			variant: {
				medium: `${primaryStateButton} ${centerTextButton} rounded-small px-2`,
				big: `${primaryStateButton} ${centerTextButton} rounded-large p-4`,
				ghost: `text-black ${centerTextButton} hover:bg-violet-200 active:bg-violet-100 disabled:text-gray-700 rounded-small px-2`,
			},
		},
		card: {
			background: "bg-violet-200",
			rounded: "rounded-large",
			shadow: "shadow",
		},
		input: {
			base: "focus:ring-2 focus:ring-violet-400",
			icon: {
				base: "w-6",
			},
			color: {
				primary: { outline: "bg-red-200" },
			},
			variant: {
				big: "p-4 rounded-large",
			},
		},
		checkbox: {
			color: "text-violet-500",
			rounded: "rounded-small",
			label: "text-base",
		},
		formGroup: {
			base: "text-base",
			label: {
				base: "text-base",
			},
			error: "font-semibold text-base text-black",
		},
	},
});
