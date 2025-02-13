import {defineNuxtRouteMiddleware} from "#app";
import {useSignup} from "~/composables/signup.composable";
import {js_decrypt} from "~/libraries/crypto.plugin";

const {load_data, data_oauth} = useSignup();

export default defineNuxtRouteMiddleware((to, from) => {
	if (!to.query.key) {
		useSignup().data_oauth.value = {} as {
			google_id: string;
			email: string;
			first_name: string;
			last_name?: string;
		};
		return;
	}
	const key = useRuntimeConfig().public.crypto_js_key!;
	const result = JSON.parse(js_decrypt(to.query.key!.toString(), key));

	if (to.query.key) load_data(result);
})