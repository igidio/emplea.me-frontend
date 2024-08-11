const primaryStateButton =
	"bg-violet-600 hover:bg-violet-500 active:bg-violet-800 disabled:bg-violet-200 text-white";
const centerTextButton = "text-center justify-center";

export default defineAppConfig({
	ui: {
		base: "",
		primary: "violet",
		button: {
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
			},
		},
		card: {
			body: {
				base: "bg-violet-200 rounded-large text-black",
			},
		},
		input: {
			base: "text-black",
			variant: {
				big: "p-4 rounded-large",
			},
		},
		checkbox: {
			base: "h-4 w-4 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",
			color: "text-violet-500",
			rounded: "rounded",
			border: "border border-gray-300 dark:border-gray-700",
		},
	},
});
