export default defineNuxtRouteMiddleware((to, from) => {
	//const { $locally } = useNuxtApp();
	let token = useCookie("token");
	if (token.value && (to.path === "/login" || to.path === "/signup"))
		return navigateTo("/");

	console.log("to", to);
	console.log("from", from);
});
