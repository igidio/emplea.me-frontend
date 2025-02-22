export default defineNuxtRouteMiddleware((to) => {
	
	let token = useCookie("token");
	if (token.value && (to.path === "/login" || to.path === "/signup")) {
		return navigateTo("/");
	}
	
	if (to.path === '/redirect') return
	
	if (!token.value) return
	const {user} = toRefs(useUserStore())

	if (user.value && !user.value.is_active &&
		!["/unable"].includes(to.path.toString())) {
		return navigateTo("/unable");
	}
	
	if (
		user.value &&
		!user.value.has_activated &&
		!["/confirmation", "/confirm", "/profile"].includes(to.path.toString())
	) {
		return navigateTo("/confirmation");
	}
});
