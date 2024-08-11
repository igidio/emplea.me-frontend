// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxtjs/color-mode"],
	colorMode: {
		preference: "light",
		fallback: "light",
	},

	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: "2024-08-10",
});
