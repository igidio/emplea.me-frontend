<template>
	<div class="flex flex-col items-center mx-4">
		<SignupGoogle
			v-if="Object.keys(data).length > 0"
			:first_name="data.first_name"
			:last_name="data.last_name"
			:email="data.email"
			:onSubmit="onSubmit"
		/>

		<SignupSelect v-model="selection" v-if="selection === undefined" />
		<SignupInternalForm
			v-if="selection !== undefined && Object.keys(data).length == 0"
			:change_selection="change_selection"
			:selection="selection"
			:schema="schema"
			:on_submit="onSubmit"
		/>
		<SignupExternalForm
			v-if="selection !== undefined && Object.keys(data).length > 0"
			:change_selection="change_selection"
			:selection="selection"
		/>
	</div>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import type { GenderEnum } from "~/enums";
import { js_decrypt } from "~/libraries/crypto.plugin";
const route = useRoute();

const selection: Ref<number | undefined> = ref();

interface dataInterface {
	google_id: string;
	email: string;
	first_name: string;
	last_name?: string;
}

const data: Ref<dataInterface> = ref({} as dataInterface);

const change_selection = () => {
	if (selection.value == 1) selection.value = 0;
	else if (selection.value == 0) selection.value = 1;
};

const load_data = () => {
	if (!route.query.key) {
		data.value = {} as dataInterface;
		return;
	}
	data.value = JSON.parse(js_decrypt(route.query.key!.toString()));
};

onMounted(() => {
	if (route.query.key) load_data();
});

watch(
	() => useRoute().query,
	() => load_data()
);

interface newUserInterface {
	email: string;
	username: string;
	password: string;
	contact: {
		first_name: string;
		last_name: string;
		phone: number;
		gender: GenderEnum;
		date_of_birth: Date;
	};
}

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Debe ser un correo electrónico válido")
		.required("El correo es obligatorio"),
	username: yup
		.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.required("El nombre de usuario es obligatorio"),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, "El teléfono debe contener solo números")
		.min(8, "El teléfono debe tener al menos 8 dígitos")
		.required("El teléfono es obligatorio"),
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
		gender: yup
			.string()
			.oneOf(["MALE", "FEMALE", "OTHER"], "Debe seleccionar un género válido")
			.required("El género es obligatorio"),
		date_of_birth: yup
			.string()
			.required("La fecha de nacimiento es obligatoria"),
	}),
});

const onSubmit = () => {
	console.log("hola");
};
</script>
