export default defineNuxtRouteMiddleware((to, from) => {
	let token = useCookie("token");
	if (token.value && (to.path === "/login" || to.path === "/signup")) {
		return navigateTo("/");
	}
	
	if (!token.value) return;
	
	const {user} = toRefs(useUserStore())
	if (user.value && !user.value.has_activated && to.path !== "/confirmation") {
		return navigateTo("/confirmation");
	}
});
