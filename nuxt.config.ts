// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxtjs/color-mode"],
	colorMode: {
		preference: "light",
		fallback: "light",
	},
	components: [
		{
			path: "components",
			pathPrefix: false,
		},
		{
			prefix: "Auth",
			path: "~/components/Auth",
			pathPrefix: true,
		},
		{
			prefix: "Landing",
			path: "~/components/Landing",
			pathPrefix: true,
		},
		{
			prefix: "Landing",
			path: "~/components/Landing",
			pathPrefix: true,
		},
		{
			prefix: "Employer",
			path: "~/components/Employer",
			pathPrefix: true,
		},
	],

	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: "2024-08-10",
});
