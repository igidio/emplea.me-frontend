import { confirmationVerifyToken } from "~/queries";

export default defineNuxtRouteMiddleware((to, from) => {
	const token = to.query.t;

	if (!token) {
		navigateTo("/forgot-password");
	}

	const { mutate, onDone, onError } = useMutation(confirmationVerifyToken);

	mutate({
		verify: { token, type: "recovery" },
	});

	onError(() => {
		useToast().add({ title: "El enlace introducido no es válido o ya expiró" });
		navigateTo("/forgot-password");
	});
	//if (token.value) return navigateTo("/");
});
