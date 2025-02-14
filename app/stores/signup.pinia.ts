import {defineStore} from "pinia";
import type {userDtoInterface} from "~/interfaces/dtos/user.dto.interface";
import type {LocationQueryRaw} from "vue-router";
import signup_data from "~/data/signup.data";

export const useSignupStore = defineStore("signup", () => {
	const past_date = computed(() => {
		let currentDate = new Date();
		let pastDate = new Date(currentDate.getTime());
		return pastDate.setFullYear(currentDate.getFullYear() - 18);
	});
	
	const state: userDtoInterface = reactive({
		email: undefined,
		username: undefined,
		password: undefined,
		password_repeat: undefined,
		google_id: undefined,
		facebook_id: undefined,
		phone: undefined,
		first_name: undefined,
		last_name: undefined,
		gender: undefined,
		date_of_birth: new Date(past_date.value),
		external_includes_email: false,
	});
	
	const selection: Ref<number | undefined> = ref();
	
	interface dataInterface {
		google_id: string | null;
		facebook_id: string | null;
		email: string | null;
		first_name: string;
		last_name?: string;
		from: string;
	}
	
	const data_oauth: Ref<dataInterface> = ref({} as dataInterface);
	
	const modify_query_params = async (params: LocationQueryRaw | undefined = {}) => {
		// await useRouter().push({
		// 	path: "/signup",
		// 	query: {...useRoute().query, ...params},
		// });
	};
	
	const set_selection = () => {
		if (
			useRoute().query.selection &&
			signup_data[parseInt(useRoute().query.selection!.toString())]
		)
			selection.value = parseInt(useRoute().query.selection as string);
		else selection.value = undefined;
	};
	
	const change_selection = async () => {
		if (selection.value == 1) {
			selection.value = 0;
		} else if (selection.value == 0) {
			selection.value = 1;
		}
		//await modify_query_params({selection: selection.value});
	};
	
	const load_data = (key: object) => {
		data_oauth.value = key as dataInterface;
		state.email = (data_oauth.value.email) || undefined;
		state.first_name = data_oauth.value.first_name;
		if (data_oauth.value.last_name)
			state.last_name = data_oauth.value.last_name;
		state.google_id = (data_oauth.value.google_id) || undefined;
		state.facebook_id = (data_oauth.value.facebook_id) || undefined;
		state.external_includes_email = !!(data_oauth.value.email);
	};
	
	const clear_state = () => {
		state.email = undefined;
		state.username = undefined;
		state.password = undefined;
		state.password_repeat = undefined;
		state.google_id = undefined;
		state.facebook_id = undefined;
		state.phone = undefined;
		state.first_name = undefined;
		state.last_name = undefined;
		state.gender = undefined;
		state.date_of_birth = undefined;
		selection.value = undefined;
	};
	
	return {
		data_oauth,
		state,
		selection,
		change_selection,
		set_selection,
		load_data,
		clear_state,
		modify_query_params,
		past_date,
	};
})