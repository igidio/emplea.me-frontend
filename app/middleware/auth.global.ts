export default defineNuxtRouteMiddleware((to, from) => {
	let token = useCookie("token");
	if (token.value && (to.path === "/login" || to.path === "/signup"))
		return navigateTo("/");
});
