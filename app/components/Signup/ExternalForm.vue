<template>
	<div class="flex flex-col gap-2 items-center mb-4">
		<h5>
			{{ signupData[selection!]?.message }}
		</h5>
		<UButton color="white" @click="change_selection" class="w-fit"
			>Cambiar</UButton
		>
		<div><b>Falta poco para completar tu registro</b></div>
	</div>

	<UForm
		:state="state"
		:schema="schema_ext"
		@submit="on_submit"
		class="flex flex-col items-center w-full gap-4"
		autocomplete="off"
	>
		<div
			class="grid grid-cols-2 bg-violet-100 w-[80%] gap-4 px-4 py-6 rounded-large"
		>
			<UFormGroup
				label="Nombre de usuario"
				help="Con el nombre de usuario podrás ingresar a tu cuenta"
				name="username"
			>
				<UInput
					placeholder="Tu nombre de usuario"
					size="lg"
					v-model="state.username"
				/>
			</UFormGroup>

			<UFormGroup
				label="Número telefónico"
				help="Tu número no se va a mostrar públicamente"
				name="contact.phone"
			>
				<UInput
					placeholder="--------"
					size="lg"
					v-model="state.contact.phone"
					type="number"
				>
					<template #leading>
						<span class="font-bold dark:text-gray-400 text-xs">+591</span>
					</template>
				</UInput>
			</UFormGroup>

			<UFormGroup label="Nombres" name="contact.first_name">
				<UInput
					placeholder="Tus nombres"
					size="md"
					v-model="state.contact.first_name"
					class="capitalize"
				/>
			</UFormGroup>

			<UFormGroup label="Apellidos" name="contact.last_name">
				<UInput
					placeholder="Tus apellidos"
					size="md"
					v-model="state.contact.last_name"
				/>
			</UFormGroup>

			<UFormGroup label="Género" class="w-full" name="contact.gender">
				<USelect
					placeholder="Seleccione"
					size="md"
					v-model="state.contact.gender"
					:options="[
						{ name: 'Masculino', value: 'MALE' },
						{ name: 'Femenino', value: 'FEMALE' },
						{ name: 'Otro', value: 'OTHER' },
					]"
					option-attribute="name"
				/>
			</UFormGroup>

			<UFormGroup label="Fecha de nacimiento" name="contact.date_of_birth">
				<VueDatePicker
					v-model="state.contact.date_of_birth"
					locale="es"
					:enable-time-picker="false"
					:max-date="new Date(past_date)"
					auto-apply
				/>
			</UFormGroup>
		</div>

		<div class="flex flex-row w-full justify-center mt-4 gap-4">
			<NuxtLink to="/login">
				<UButton variant="ghost" size="lg" class="w-40">Cancelar</UButton>
			</NuxtLink>
			<UButton size="lg" class="w-40" type="submit" :loading="loading"
				>Registrarme</UButton
			>
		</div>
	</UForm>

	<span class="error py-2 inline-block w-full text-center" v-if="error">
		{{ format_error_message_computed }}

		<span
			class="inline-block"
			v-if="format_error_message_computed == 'Un registro similar ya existe.'"
			>Ya existe otro usuario registrado con el mismo nombre de usuario o cuenta
			de Google / LinkedIn.</span
		>
	</span>

	<span class="font-semibold mt-4">
		Al registrarte estás aceptandos los
		<NuxtLink class="hyper" to="/terms-of-service"
			>términos y condiciones.</NuxtLink
		>
	</span>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "~/assets/css/vue-datepicker.css";

import signupData from "~/data/signup.data.js";
import create from "~/helpers/error_message.helper";
import format_date from "~/helpers/format_date.helper";

const toast = useToast();
const userStore = useUserStore();

const {
	state,
	past_date,
	schema_ext,
	query,
	selection,
	change_selection,
	clear_state,
} = useSignup();

const { mutate: signup, error, loading, onDone } = useMutation(query);

const format_error_message_computed = create(error);

const on_submit = async () => {
	await signup({
		createUser: {
			email: state.email,
			username: state.username,
			password: state.password,
			google_id: state.google_id ? state.google_id : undefined,
			contact: {
				phone: state.contact.phone,
				first_name: state.contact.first_name,
				last_name: state.contact.last_name,
				gender: state.contact.gender,
				date_of_birth: format_date(state.contact.date_of_birth! as Date),
			},
		},
		clientRole: {
			role: signupData[selection.value!]?.type,
		},
	});
};

onDone((result) => {
	userStore.set_token(result.data.clientSignup.token);
	userStore.set_user(result.data.clientSignup.user);
	clear_state();
	useRouter().push("/");
	toast.add({ title: "Te registraste correctamente." });
});
</script>
