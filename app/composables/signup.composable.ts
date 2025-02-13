import type {LocationQueryRaw} from "vue-router";
import signup_data from "~/data/signup.data";
import type {userDtoInterface} from "~/interfaces/dtos/user.dto.interface";

const state: userDtoInterface = reactive({
	email: undefined,
	username: undefined,
	password: undefined,
	password_repeat: undefined,
	google_id: undefined,
	linkedin_id: undefined,
	contact: {
		phone: undefined,
		first_name: undefined,
		last_name: undefined,
		gender: undefined,
		date_of_birth: undefined,
	},
});

const selection: Ref<number | undefined> = ref();

interface dataInterface {
	google_id: string;
	email: string;
	first_name: string;
	last_name?: string;
}

const data_oauth: Ref<dataInterface> = ref({} as dataInterface);

export function useSignup() {
	const modify_query_params = (params: LocationQueryRaw | undefined = {}) => {
		useRouter().push({
			path: "/signup",
			query: {...useRoute().query, ...params},
		});
	};
	
	const set_selection = () => {
		if (
			useRoute().query.selection &&
			signup_data[parseInt(useRoute().query.selection!.toString())]
		)
			selection.value = parseInt(useRoute().query.selection as string);
		else selection.value = undefined;
	};
	
	const change_selection = () => {
		if (selection.value == 1) {
			selection.value = 0;
		} else if (selection.value == 0) {
			selection.value = 1;
		}
		modify_query_params({selection: selection.value});
	};
	
	const past_date = computed(() => {
		let currentDate = new Date();
		let pastDate = new Date(currentDate.getTime());
		return pastDate.setFullYear(currentDate.getFullYear() - 18);
	});
	
	const load_data = (key: object) => {
		data_oauth.value = key as dataInterface;
		console.log(data_oauth.value)
		state.email = data_oauth.value.email;
		state.contact.first_name = data_oauth.value.first_name;
		if (data_oauth.value.last_name)
			state.contact.last_name = data_oauth.value.last_name;
		state.google_id = data_oauth.value.google_id;
	};
	
	const clear_state = () => {
		state.email = undefined;
		state.username = undefined;
		state.password = undefined;
		state.password_repeat = undefined;
		state.google_id = undefined;
		state.linkedin_id = undefined;
		state.contact.phone = undefined;
		state.contact.first_name = undefined;
		state.contact.last_name = undefined;
		state.contact.gender = undefined;
		state.contact.date_of_birth = undefined;
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
}
