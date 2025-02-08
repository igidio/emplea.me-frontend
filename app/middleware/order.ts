export default defineNuxtRouteMiddleware((to, from) => {
	const id = Number(to.params.id)
	
	if (id === 0) {
		useToast().add({ title: 'Plan no encontrado.'})
		return navigateTo('/payment')
}
	
	const {plans} = usePostStore()
	if (!plans[id]) {
		useToast().add({ title: 'Plan no encontrado.'})
		return navigateTo('/payment')
	}
});
