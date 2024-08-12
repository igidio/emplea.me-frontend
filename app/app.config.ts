import { _white } from "#tailwind-config/theme/accentColor";

const primaryStateButton =
	"bg-violet-600 hover:bg-violet-500 active:bg-violet-800 disabled:bg-violet-200 text-white";
const centerTextButton = "text-center justify-center text-base";
const primaryOutlineButton =
	"border-2 border-violet-600 hover:bg-violet-100 active:bg-violet-200 disabled:border-violet-200 disabled:text-gray-700 text-black";
const primaryGhostStateButton =
	"hover:bg-violet-200 active:bg-violet-100 disabled:text-gray-700";

export default defineAppConfig({
	icon: {
		size: "21px", // default <Icon> size applied
		class: "icon", // default <Icon> class applied
		mode: "css", // default <Icon> mode applied
	},
	ui: {
		primary: "violet",
		button: {
			base: "trainsition-all",
			font: "text-base font-semibold",
			size: {
				md: "text-base justify-center rounded-medium px-2",
				lg: "text-base justify-center rounded-large",
			},
			padding: {
				md: "px-4",
				lg: "px-4 py-4",
			},
			color: {
				primary: {
					solid: primaryStateButton,
					outline: primaryOutlineButton,
					ghost: primaryGhostStateButton,
				},
			},
			default: {
				size: "md",
				color: "primary",
			},
			variant: {
				big: `${primaryStateButton} ${centerTextButton} rounded-large px-4`,
				//ghost: `text-black ${centerTextButton} ${primaryGhostStateButton}  rounded-small px-2`,
				big_outline: `${centerTextButton} ${primaryOutlineButton} ${primaryGhostStateButton} rounded-large p-4`,
				big_ghost: `${centerTextButton} ${primaryGhostStateButton} rounded-large p-4`,
			},
		},
		card: {
			background: "bg-violet-200",
			rounded: "rounded-large",
			shadow: "shadow",
		},
		input: {
			base: "focus:ring-2 focus:ring-violet-400",
			size: {
				md: "text-base rounded-medium",
				lg: "text-base rounded-large",
			},
			padding: {
				md: "p-2",
				lg: "p-4",
			},
			icon: {
				base: "w-6",
			},
			color: {
				white: { solid: "bg-white text-black shadow-none" },
				gray: { solid: "bg-white" },
			},
			variant: {
				outline: "bg-white",
			},
			leading: {
				padding: {
					md: "pl-12",
					lg: "pl-14",
				},
			},
			default: {
				color: "white",
				size: "md",
			},
		},
		checkbox: {
			color: "text-violet-500",
			rounded: "rounded-small",
			label: "text-base",
		},
		formGroup: {
			size: {
				sm: "text-base",
			},
			label: {
				base: "text-base",
			},
			error: "font-semibold text-base text-black",
			help: "text-black text-sm",
			default: {
				size: "sm",
			},
		},
		select: {
			size: {
				sm: "text-base rounded-medium",
				md: "text-base rounded-medium",
			},
			default: {
				size: "sm",
			},
		},
	},
});
