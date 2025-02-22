import {useUserStore} from "~/stores/user.pinia";

export default defineNuxtRouteMiddleware((to, from) => {
	const {roles} = to.meta;
	const userStore = useUserStore();
	
	if (!userStore.user_role) {
		useToast().add({title: "Debes iniciar sesión para acceder a esta página"});
		return navigateTo('/')
	}
	
	if (roles && (roles as string[]).length > 0 && !(roles as string[]).includes(userStore.user_role)) {
		useToast().add({title: "No tienes permisos para acceder a esta página"});
		return navigateTo('/')
	}
	
	
})