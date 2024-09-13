export default defineNuxtRouteMiddleware((to, from) => {
	let token = useCookie("token");
	if (!token.value && to.path === "/profile") return navigateTo("/");
});
