// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	//ssr: false,
	devtools: {enabled: true},
	modules: [
		"@nuxt/ui",
		//"@nuxtjs/color-mode",
		"@nuxtjs/apollo",
		"@pinia/nuxt",
		//"@nuxtjs/google-adsense"
	],
	runtimeConfig: {
		public: {
			server_host: process.env.SERVER_HOST,
			google_client_id: process.env.GOOGLE_CLIENT_ID,
			google_callback: process.env.GOOGLE_CALLBACK,
		},
	},
	build: {
		transpile: ["@vuepic/vue-datepicker"],
	},
	apollo: {
		tokenStorage: "cookie",
		clients: {
			default: {
				httpEndpoint: process.env.QGL_HOST!,
				// httpLinkOptions: {
				// 	credentials: "include",
				// },
				tokenName: "token",
			},
		},
	},
	// colorMode: {
	// 	preference: "light",
	// 	fallback: "light",
	// },
	devServer: {
		port: 5173,
	},
	// googleAdsense: {
	// 	id: 'ca-pub-6257864254238276',
	// 	onPageLoad: true,
	// 	pageLevelAds: true,
	// 	test: true
	// },
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
		{
			prefix: "Job",
			path: "~/components/Job",
			pathPrefix: true,
		},
		{
			prefix: "Admin",
			path: "~/components/Admin",
			pathPrefix: true,
		},
		{
			prefix: "Signup",
			path: "~/components/Signup",
			pathPrefix: true,
		},
		// {
		// 	prefix: "Search",
		// 	path: "~/components/Search",
		// 	pathPrefix: true,
		// },
		{
			prefix: "Notifications",
			path: "~/components/Notifications",
			pathPrefix: true,
		},
		{
			prefix: "Profile",
			path: "~/components/Profile",
			pathPrefix: true,
		},
		{
			prefix: "Payment",
			path: "~/components/Payment",
			pathPrefix: true,
		},
	],

	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: "2024-08-10",
});