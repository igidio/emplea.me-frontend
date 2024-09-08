import { defineStore } from "pinia";
import { getUserByToken } from "~/queries";

import { useQuery } from "@vue/apollo-composable";
import Login from "~/pages/login.vue";
import type { UserInterface } from "~/interfaces";

export const useUserStore = defineStore("user", () => {
	const user: Ref<UserInterface> = ref({} as UserInterface);
	const token: Ref<string> = ref("");
	const initial_loading = ref(true);

	//token.value = localStorage.getItem("token");

	const get_token = () => {
		if (import.meta.client) {
			let token_from_storage = localStorage.getItem("token");
			if (token_from_storage) token.value = token_from_storage;
		}
	};

	const set_token = (new_token: string, set_to_storage: boolean = true) => {
		if (set_to_storage) localStorage.setItem("token", new_token);
		token.value = new_token;
	};

	const set_user = (new_user: UserInterface) => (user.value = new_user);

	const get_current_user = async () => {
		initial_loading.value = true;
		await useApollo().getToken();

		if (token.value !== "" && !(Object.keys(user.value).length > 0)) {
			let { data }: { data: any } = await useAsyncQuery(getUserByToken, {
				server: false,
			});

			let { getUserByToken: res } = data.value;

			console.log(data.value);

			user.value = res;
		}

		initial_loading.value = false;
	};

	const update_user = async () => {};

	const logout = () => {
		if (import.meta.client) {
			localStorage.removeItem("token");
			user.value = {} as UserInterface;
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
		update_user,
		logout,
	};
});
