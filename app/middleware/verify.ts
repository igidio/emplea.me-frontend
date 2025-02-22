import {gqlConfirmation} from "~/queries";

export default defineNuxtRouteMiddleware(async (to) => {
	if (!to.query.identifier || !to.query.token) {
		useToast().add({title: "Debes pasar por el proceso de verificación"});
		return navigateTo("/");
	}
	
	const { error: error_verify } = await useAsyncQuery<{ confirmationVerifyToken: Boolean }>(gqlConfirmation.verify, {
		"verify": {
			"identifier": to.query.identifier,
			"token": to.query.token
		}
	})
	
	if (error_verify.value) {
		useToast().add({ title: error_verify.value?.message })
		return navigateTo("/");
	}
});
