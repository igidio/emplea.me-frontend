import { defineStore } from "pinia";
import { getUserByToken } from "~/queries";

export const useUserStore = defineStore("user", () => {
	const user: any = ref({});
	const token: Ref<string> = ref("");
	const initial_loading = ref(true);

	//token.value = localStorage.getItem("token");

	const set_token = (new_token: string) => {
		if (import.meta.client) {
			localStorage.setItem("token", new_token);
		}
		token.value = new_token;
	};

	const set_user = (new_user: object) => {
		user.value = new_user;
		console.log(new_user);
	};

	const get_current_user = async () => {
		initial_loading.value = true;
		console.log("ejecutando");

		await useApollo().getToken();
		if (token && !(Object.keys(user.value).length > 0)) {
			const { data } = await useAsyncQuery(getUserByToken);
			user.value = data.value;
		}
		initial_loading.value = false;
		console.log(initial_loading.value);
	};

	const update_user = async () => {
		//if (get_current_user());
	};

	const get_token = () => {
		if (import.meta.client) {
			let token_from_storage = localStorage.getItem("token");
			if (token_from_storage) token.value = token_from_storage;
		}
	};

	return {
		user,
		token,
		get_token,
		set_token,
		set_user,
		get_current_user,
		initial_loading,
	};
});
