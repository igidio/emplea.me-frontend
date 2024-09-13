import * as yup from "yup";
import { GenderEnum } from "~/enums";
import { js_decrypt } from "~/libraries/crypto.plugin";
import type { LocationQueryRaw } from "vue-router";

import format_date from "~/helpers/format_date.helper";
import signup_data from "~/data/signup.data";
import type { userDtoInterface } from "~/interfaces/dtos/user.dto.interface";

const state: userDtoInterface = reactive({
	email: "adriancitoooo@gmail.com",
	username: "adrianazoooo",
	password: "SALVA1234a",
	password_repeat: "SALVA1234a",
	google_id: undefined,
	linkedin_id: undefined,
	contact: {
		phone: "12345678",
		first_name: "Salvador",
		last_name: "Adrian",
		gender: GenderEnum.MALE,
		date_of_birth: new Date("11/11/2000"),
	},
});

const selection: Ref<number | undefined> = ref();

export function useSignup() {
	const route = useRoute();

	interface dataInterface {
		google_id: string;
		email: string;
		first_name: string;
		last_name?: string;
	}

	const data_oauth: Ref<dataInterface> = ref({} as dataInterface);

	const modify_query_params = (params: LocationQueryRaw | undefined = {}) => {
		useRouter().push({
			path: "/signup",
			query: { ...route.query, ...params },
		});
	};

	const set_selection = () => {
		if (
			route.query.selection &&
			signup_data[parseInt(route.query.selection.toString())]
		)
			selection.value = parseInt(route.query.selection as string);
		else selection.value = undefined;
	};

	const change_selection = () => {
		if (selection.value == 1) {
			selection.value = 0;
		} else if (selection.value == 0) {
			selection.value = 1;
		}
		modify_query_params({ selection: selection.value });
	};

	onMounted(() => {
		if (route.query.key) load_data();
	});

	watch(
		() => useRoute().query,
		() => load_data()
	);

	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Debe ser un correo electrónico válido")
			.required("El correo es obligatorio"),
		username: yup
			.string()
			.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
			.required("El nombre de usuario es obligatorio"),
		password: yup
			.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.required("La contraseña es obligatoria"),
		password_repeat: yup
			.string()
			.required("Debe confirmar la contraseña")
			.test(
				"passwords-match",
				"Las contraseñas deben coincidir",
				function (value) {
					return value === this.parent.password;
				}
			),
		contact: yup.object().shape({
			first_name: yup.string().required("El nombre es obligatorio"),
			last_name: yup.string().required("El apellido es obligatorio"),
			phone: yup
				.string()
				.matches(/^[0-9]+$/, "El teléfono debe contener solo números")
				.min(8, "El teléfono debe tener al menos 8 dígitos")
				.required("El teléfono es obligatorio"),
			gender: yup
				.string()
				.oneOf(["MALE", "FEMALE", "OTHER"], "Debe seleccionar un género válido")
				.required("El género es obligatorio"),
			date_of_birth: yup
				.string()
				.required("La fecha de nacimiento es obligatoria"),
		}),
	});

	const schema_ext = yup.object().shape({
		username: yup
			.string()
			.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
			.required("El nombre de usuario es obligatorio"),
		contact: yup.object().shape({
			first_name: yup.string().required("El nombre es obligatorio"),
			last_name: yup.string().required("El apellido es obligatorio"),
			phone: yup
				.string()
				.matches(/^[0-9]+$/, "El teléfono debe contener solo números")
				.min(8, "El teléfono debe tener al menos 8 dígitos")
				.required("El teléfono es obligatorio"),
			gender: yup
				.string()
				.oneOf(["MALE", "FEMALE", "OTHER"], "Debe seleccionar un género válido")
				.required("El género es obligatorio"),
			date_of_birth: yup
				.string()
				.required("La fecha de nacimiento es obligatoria"),
		}),
	});

	const query = gql`
		mutation ClientSignup(
			$createUser: CreateUserInput!
			$clientRole: ClientRoleInput!
		) {
			clientSignup(createUser: $createUser, clientRole: $clientRole) {
				token
				user {
					id
					username
					email
					image
					google_id
					linkedin_id
					created_at
					modified_at
					role
					is_active
					contact {
						first_name
						last_name
						phone
						gender
						date_of_birth
						created_at
						modified_at
					}
				}
			}
		}
	`;

	// const state = reactive({
	// 	email: undefined,
	// 	username: undefined,
	// 	password: undefined,
	// 	password_repeat: undefined,
	// 	phone: undefined,
	// 	contact: {
	// 		first_name: undefined,
	// 		last_name: undefined,
	// 		gender: undefined,
	// 		date_of_birth: undefined,
	// 	},
	// });

	const past_date = computed(() => {
		let currentDate = new Date();
		let pastDate = new Date(currentDate.getTime());
		return pastDate.setFullYear(currentDate.getFullYear() - 18);
	});

	const load_data = () => {
		if (!route.query.key) {
			data_oauth.value = {} as dataInterface;
			return;
		}

		try {
			data_oauth.value = JSON.parse(js_decrypt(route.query.key!.toString()));
		} catch (e) {
			useRouter().push({
				path: "/signup",
				query: {},
			});
			clear_state();
		}
		state.email = data_oauth.value.email;
		state.contact.first_name = data_oauth.value.first_name;
		if (data_oauth.value.last_name)
			state.contact.last_name = data_oauth.value.last_name;
		state.google_id = data_oauth.value.google_id;
	};

	// watch(
	// 	() => useRoute().query.selection,
	// 	() => alert("hola")
	// );

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
		schema,
		schema_ext,
		state,
		selection,
		// methods
		//onSubmit,
		change_selection,
		set_selection,
		clear_state,
		modify_query_params,
		query,
		past_date,
		//format_error_message_computed,
	};
}
