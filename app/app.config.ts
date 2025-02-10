import {_white} from "#tailwind-config/theme/accentColor";

const colorInput = {
	white: {solid: "bg-white text-black", outline: "ring-0"},
	gray: {solid: "bg-white"},
};

export default defineAppConfig({
	icon: {},
	primary: "violet",
	gray: "gray",
	ui: {
		primary: "violet",
		
		button: {
			base: "trainsition-all",
			font: "text-base font-semibold",
			size: {
				sm: "text-sm justify-center rounded-medium px-1",
				md: "text-base justify-center rounded-medium px-2",
				lg: "text-base justify-center rounded-large",
			},
			padding: {
				md: "px-4",
				lg: "px-4 py-4",
			},
			color: {
				primary: {
					outline: "outline-primary",
					ghost: "ghost-primary",
				},
				black: {
					solid: "black",
				},
				gold: {
					solid: "gold",
				},
				white: {
					solid: "white",
					outline: "ring-0",
					ghost: "ghost-primary",
				},
			},
			default: {
				size: "md",
				color: "primary",
			},
			variant: {
				outline: "none",
				none: "ring-0 shadow-none",
				ghost: "opacity-50",
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
			base: "focus:ring-2 focus:ring-violet-400 rounded-medium",
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
				gray: "bg-white-50",
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
			error: "font-semibold text-base text-red-500",
			help: "text-black text-sm overflow-hidden text-ellipsis",
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
			file: {
				base: "",
			},
			variant: {
				none: "",
				outline: "bg-white",
			},
			color: colorInput,
			default: {
				color: "white",
				size: "sm",
			},
		},
		selectMenu: {
			option: {
				size: "text-base",
				rounded: "rounded-small",
				padding: "p-2",
			},
			select: 'min-h-10'
		},
		modal: {
			rounded: "rounded-large",
		},
		
		badge: {
			rounded: "rounded-small",
		},
		dropdown: {
			base: ' border',
			item: {
				rounded: "rounded-small",
				padding: "px-2",
			},
			width: "w-32",
			background: "bg-white",
			rounded: "rounded-large",
			ring: "ring-0",
			padding: "py-2 px-2",
		},
		popover: {
			background: "bg-white",
			rounded: "rounded-large",
			ring: "ring-0",
		},
		notification: {
			rounded: "rounded-medium",
		},
		notifications: {
			wrapper: "fixed flex flex-col justify-end z-[55]",
			position: "bottom-0 end-0",
			width: "w-full tablet:w-1/2 desktop:w-[40%] sm:w-96",
			container: "px-4 sm:px-6 py-6 space-y-3 overflow-y-auto",
		},
		textarea: {
			rounded: 'rounded-medium',
		},
		alert: {
			rounded: 'rounded-medium',
			color: {
				violet: {
					solid: 'bg-violet-100 text-violet-500',
				},
				red: {
					solid: 'bg-red-100 text-red-500',
				}
			}
		},
		table: {
			default: {
				emptyState: {
					label: 'No hay registros',
				}
			}
		}
	},

});
