<template>
	<div class="flex flex-col gap-2 items-center mb-4">
		<h5>
			{{ signupData[selection!]?.message }}
		</h5>
		<UButton color="white" @click="change_selection" class="w-fit"
		>Cambiar
		</UButton
		>
		<div><b>Falta poco para completar tu registro</b></div>
	</div>

	<UForm
		:state="state"
		:schema="schema"
		@submit="on_submit"
		class="flex flex-col items-center w-full gap-4"
		autocomplete="off"
	>
		<div
			class="grid grid-cols-2 bg-violet-100 w-[80%] gap-4 px-4 py-6 rounded-large"
		>
			<UFormGroup
				label="Correo electrónico"
				name="email"
				class="col-span-2"
				v-if="!state.external_includes_email"
			>
				<UInput
					placeholder="correo@mail.com"
					size="lg"
					v-model="state.email"
				/>
			</UFormGroup>

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
				name="phone"
			>
				<UInput
					placeholder="--------"
					size="lg"
					v-model="state.phone"
					type="number"
				>
					<template #leading>
						<span class="font-bold">+591</span>
					</template>
				</UInput>
			</UFormGroup>

			<UFormGroup
				label="Nombres"
				name="first_name"
			>
				<UInput
					placeholder="Tus nombres"
					size="md"
					v-model="state.first_name"
					class="capitalize"
				/>
			</UFormGroup>

			<UFormGroup
				label="Apellidos"
				name="last_name"
			>
				<UInput
					placeholder="Tus apellidos"
					size="md"
					v-model="state.last_name"
				/>
			</UFormGroup>

			<UFormGroup
				label="Género"
				class="w-full"
				name="gender"
			>
				<USelect
					placeholder="Seleccione"
					size="md"
					v-model="state.gender"
					:options="[
						{ name: 'Masculino', value: 'MALE' },
						{ name: 'Femenino', value: 'FEMALE' },
						{ name: 'Otro', value: 'OTHER' },
					]"
					option-attribute="name"
				/>
			</UFormGroup>

			<UFormGroup
				label="Fecha de nacimiento"
				name="date_of_birth"
			>
				<VueDatePicker
					v-model="state.date_of_birth"
					locale="es"
					:enable-time-picker="false"
					:timezone="{ emitTimezone: 'America/Santiago' }"
					:max-date="new Date(past_date)"
					auto-apply
					format="dd/MM/yyyy"

				>
					<template
						#dp-input="{value}"
						#trigger
					>
						<UInput
							:model-value="value"
							:readonly="true"
							icon="ri:calendar-line"
						/>
					</template>
				</VueDatePicker>
			</UFormGroup>
		</div>

		<div class="flex flex-row w-full justify-center mt-4 gap-4">
			<NuxtLink to="/login">
				<UButton variant="ghost" size="lg" class="w-40">Cancelar</UButton>
			</NuxtLink>
			<UButton
				size="lg"
				class="w-40"
				type="submit"
				:disabled="loading"
			>Registrarme
			</UButton
			>
		</div>
	</UForm>

	<span class="error py-2 inline-block w-full text-center" v-if="error">
		<span
			class="inline-block"
		>Ya existe otro usuario registrado con el mismo nombre de usuario, correo o cuenta
			de Google / Facebook.</span
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
import {format_name} from "~/helpers";
import {clientSignupQuery} from "~/queries";
import {external_form_schema} from "~/schemas";

const toast = useToast();
const userStore = useUserStore();

const {change_selection, clear_state, state} =
	useSignupStore();
const {past_date, selection} = storeToRefs(useSignupStore());

const {
	mutate: signup,
	error,
	loading,
	onDone,
} = useMutation(clientSignupQuery);

const schema = external_form_schema

const on_submit = async () => {
	console.log(state);
	await signup({
		createUser: {
			username: state.username!.trim(),
			email: state.email!.trim(),
			google_id: state.google_id ? state.google_id : undefined,
			facebook_id: state.facebook_id ? state.facebook_id : undefined,
			password: 'THIS_IS_A_FAKE_PASSWORd123',
			contact: {
				phone: state.phone!,
				first_name: format_name(state.first_name!.trim()),
				last_name: format_name(state.last_name!.trim()),
				gender: state.gender,
				date_of_birth: new Date(state.date_of_birth!),
			}
		},
		clientRole: {
			role: String(signupData[selection.value!]?.type),
		},
	}).catch((e) => console.log(e));
};

onDone((result) => {
	clear_state();
	userStore.set_token(result.data.clientSignup.token);
	useRouter().go(0);
});
</script>
