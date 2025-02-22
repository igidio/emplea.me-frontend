<template>
	<UNotifications/>
	<div class="flex flex-col gap-2 items-center mb-6">
		<h6>Te vas a registrar como administrador</h6>
	</div>

	<UForm
		:state="state"
		:schema="internal_form_schema"
		@submit="on_submit"
		class="flex flex-col desktop:flex-row w-full gap-4"
		autocomplete="off"
	>

		<div class="flex flex-col w-full gap-4">
			<h5 class="text-center">Información de Usuario</h5>
			<div class="bg-violet-100 flex flex-col gap-4 px-4 py-6 rounded-large">
				<UFormGroup
					label="Correo electrónico"
					name="email"
				>
					<UInput
						placeholder="correo_electronico@mail.com"
						size="lg"
						v-model="state.email"
						autocomplete="email"
					/>
				</UFormGroup>

				<div class="flex flex-row gap-4">
					<UFormGroup
						class="w-full"
						label="Nombre de usuario"
						help="Con el nombre de usuario podrás ingresar a tu cuenta"
						name="username"
					>
						<UInput
							placeholder="Tu nombre de usuario"
							size="lg"
							v-model="state.username"
							autocomplete="username"
						/>
					</UFormGroup>

					<UFormGroup
						class="w-full"
						label="Número telefónico"
						help="Tu número no se va a mostrar públicamente"
						name="phone"
					>
						<UInput
							placeholder="--------"
							size="lg"
							v-model="state.phone"
							autocomplete="phone"
						>
							<template #leading>
								<span class="font-bold dark:text-gray-400 text-sm">+591</span>
							</template>
						</UInput>
					</UFormGroup>
				</div>
				<UFormGroup label="Contraseña" name="password">
					<UInput size="lg" type="password" v-model="state.password"
					        autocomplete="new-password"/>
				</UFormGroup>

				<UFormGroup label="Repetir contraseña" name="password_repeat">
					<UInput
						size="lg"
						type="password"
						v-model="state.password_repeat"
						autocomplete="new-password"
					/>
				</UFormGroup>
			</div>
		</div>

		<div class="flex flex-col w-full gap-4">
			<h5 class="text-center">Datos de contacto</h5>
			<div
				class="bg-violet-100 flex flex-col gap-4 px-4 py-6 rounded-large h-fit"
			>
				<div class="flex flex-row gap-4">
					<UFormGroup label="Nombres" class="w-full" name="first_name">
						<UInput
							placeholder="Tus nombres"
							size="md"
							v-model="state.first_name"
							autocomplete="off"
						/>
					</UFormGroup>

					<UFormGroup label="Apellidos" class="w-full" name="last_name">
						<UInput
							placeholder="Tus apellidos"
							size="md"
							v-model="state.last_name"
							autocomplete="off"
						/>
					</UFormGroup>
				</div>

				<div class="flex flex-row gap-4">
					<UFormGroup label="Género" class="w-full" name="gender">
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
						class="w-full"
						name="date_of_birth"
					>
						<VueDatePicker
							v-model="state.date_of_birth"
							locale="es"
							:enable-time-picker="false"
							:max-date="new Date(past_date)"
							auto-apply
						/>
					</UFormGroup>
				</div>
			</div>
			<div class="flex flex-row w-full justify-center gap-4">
				<NuxtLink to="/login">
					<UButton variant="ghost" size="lg" class="w-40">Cancelar</UButton>
				</NuxtLink>
				<UButton size="lg" class="w-40" type="submit" :loading="loading"
				>Registrarme
				</UButton
				>
			</div>

			<span class="error py-2 inline-block w-full text-center" v-if="error">
				{{ format_error_message_computed }}

				<span
					class="inline-block"
					v-if="
						format_error_message_computed == 'Un registro similar ya existe.'
					"
				>Ya existe otro usuario registrado con el mismo nombre de usuario o
					correo electrónico.</span
				>
			</span>

			<span class="font-semibold text-center">
				Al registrarte estás aceptandos los
				<NuxtLink class="hyper" to="/terms-of-service"
				>términos y condiciones.</NuxtLink
				>
			</span>
		</div>
		<!-- </div> -->
	</UForm>
</template>

<script setup lang="ts">
import * as yup from "yup";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "~/assets/css/vue-datepicker.css";

import signupData from "~/data/signup.data";
import {create_error_message, format_date, format_name} from "~/helpers";
import {clientSignupQuery, gqlUser} from "~/queries";
import {internal_form_schema, user_schema} from "~/schemas";
import {useSignupStore} from "~/stores/signup.pinia";

definePageMeta({
	middleware: ['verify']
})

useHead({
	title: "Registrarse como administrador"
})

const { set_token } = useUserStore();
const route = useRoute()
const toast = useToast();

const {past_date, state, clear_state} = useSignupStore();
const { selection } = storeToRefs(useSignupStore());

const {
	mutate: signup,
	error,
	loading,
	onDone,
} = useMutation<{ adminRegister: any }>(gqlUser.admin_register);

const format_error_message_computed = create_error_message(error);

const on_submit = async () => {
	await signup({
		"createUser": {
			"contact": {
				"date_of_birth": new Date(state.date_of_birth!),
				"first_name": format_name(state.first_name!.trim()),
				"gender": state.gender,
				"last_name": format_name(state.last_name!.trim()),
				"phone": +state.phone!,
			},
			"email": state.email!.trim(),
			"password": state.password!.trim(),
			"username": state.username!.trim(),
		},
		"verify": {
			"identifier": route.query.identifier!.toString(),
			"token": route.query.token!.toString(),
		}
	})
};

onDone((result) => {
	clear_state();
	set_token(result.data?.adminRegister.token);
	useRouter().push("/redirect");
	toast.add({title: "Te registraste correctamente."});
	window.location.replace('/')
});


</script>
