import {defineNuxtRouteMiddleware} from "#app";
import {js_decrypt} from "~/libraries/crypto.plugin";


export default defineNuxtRouteMiddleware((to, from) => {
	const {load_data} = useSignupStore();
	const {data_oauth} = storeToRefs(useSignupStore());
	
	if (!to.query.key) {
		data_oauth.value = {} as {
			google_id: string;
			facebook_id: string;
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