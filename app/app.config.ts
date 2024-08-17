import { _white } from "#tailwind-config/theme/accentColor";

const primaryStateButton = `
	bg-violet-600 
	hover:bg-violet-500 
	active:bg-violet-800 
	disabled:bg-violet-200 
	text-white
`;
const centerTextButton = "text-center justify-center text-base";
const primaryOutlineButton = `
	border-2 
	border-violet-600 
	hover:bg-violet-100 
	active:bg-violet-200 
	disabled:border-violet-200 
	disabled:text-gray-700 
	text-black
`;
const primaryGhostStateButton =
	"hover:bg-violet-200 active:bg-violet-100 disabled:text-gray-700";

const blackStateButton = `
	bg-black 
	hover:bg-gray-950 
	active:bg-gray-800 
	disabled:bg-gray-200 
	text-white
`;

const whiteStateButton = `
	bg-white 
	hover:bg-gray-100 
	active:bg-gray-200 
	disabled:text-gray-500
	text-black
`;

const colorInput = {
	white: { solid: "bg-white text-black", outline: "ring-0" },
	gray: { solid: "bg-white" },
};

export default defineAppConfig({
	icon: {},
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
				black: {
					solid: blackStateButton,
				},
				white: {
					solid: whiteStateButton,
					outline: "ring-0",
					ghost: primaryGhostStateButton,
				},
			},
			default: {
				size: "md",
				color: "primary",
			},
			variant: {
				outline: "none",
				none: "ring-0 shadow-none",
			},
		},

		card: {
			background: "bg-white",
			rounded: "rounded-large",
			shadow: "shadow",
			header: {
				base: "font-semibold text-2xl",
			},
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
			color: colorInput,
			variant: {
				outline: "bg-white",
				none: "ring-0 shadow-none",
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
				md: "text-base rounded-medium",
				lg: "text-base rounded-large",
			},
			padding: {
				md: "p-2",
				lg: "p-4",
			},
			color: colorInput,
			default: {
				size: "sm",
			},
		},
		modal: {
			rounded: "rounded-large",
		},
		selectMenu: {
			base: "m-1",
			option: {
				size: "text-base",
				rounded: "rounded-small",
				padding: "p-2",
			},
			padding: "py-4",
			rounded: "rounded-large",
		},
		badge: {
			rounded: "rounded-small",
		},
	},
});
