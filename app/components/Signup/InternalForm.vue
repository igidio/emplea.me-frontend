<template>
	<div class="flex flex-col gap-2 items-center">
		<h3>Ingresa tus datos</h3>
		<h5>
			{{ signupData[selection]?.message }}
		</h5>
		<UButton color="white" @click="change_selection">Cambiar</UButton>
		<div class="flex flex-row gap-4 my-4">
			<AuthExternal />
		</div>
	</div>

	<UForm
		:state="state"
		:schema="schema"
		@submit="onSubmitt()"
		class="flex flex-row w-full gap-4"
		autocomplete="off"
	>
		<!-- <div class=""> -->
		<div class="flex flex-col w-full gap-4">
			<h5 class="text-center">Información de Usuario</h5>
			<div class="bg-violet-100 flex flex-col gap-4 px-4 py-6 rounded-large">
				<UFormGroup label="Correo electónico" name="email">
					<UInput
						placeholder="correo_electronico@mail.com"
						size="lg"
						v-model="state.email"
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
						/>
					</UFormGroup>

					<UFormGroup
						class="w-full"
						label="Número telefónico"
						help="Tu número no se va a mostrar públicamente"
						name="phone"
					>
						<UInput placeholder="--------" size="lg" v-model="state.phone">
							<template #leading>
								<span class="font-bold dark:text-gray-400 text-xs">+591</span>
							</template>
						</UInput>
					</UFormGroup>
				</div>
				<UFormGroup label="Contraseña" name="password">
					<UInput size="lg" type="password" v-model="state.password" />
				</UFormGroup>

				<UFormGroup label="Repetir contraseña" name="password_repeat">
					<UInput size="lg" type="password" v-model="state.password_repeat" />
				</UFormGroup>
			</div>
		</div>

		<div class="flex flex-col w-full gap-4">
			<h5 class="text-center">Datos de contacto</h5>
			<div
				class="bg-violet-100 flex flex-col gap-4 px-4 py-6 rounded-large h-fit"
			>
				<div class="flex flex-row gap-4">
					<UFormGroup label="Nombres" class="w-full" name="contact.first_name">
						<UInput
							placeholder="Tus nombres"
							size="md"
							v-model="state.contact.first_name"
						/>
					</UFormGroup>

					<UFormGroup label="Apellidos" class="w-full" name="contact.last_name">
						<UInput
							placeholder="Tus apellidos"
							size="md"
							v-model="state.contact.last_name"
						/>
					</UFormGroup>
				</div>

				<div class="flex flex-row gap-4">
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

					<UFormGroup
						label="Fecha de nacimiento"
						class="w-full"
						name="contact.date_of_birth"
					>
						<VueDatePicker
							v-model="state.contact.date_of_birth"
							locale="es"
							:enable-time-picker="false"
							:max-date="new Date(pastDate)"
							auto-apply
						/>
					</UFormGroup>
				</div>
			</div>
			<div class="flex flex-row w-full justify-center gap-4">
				<UButton variant="ghost" size="lg" class="w-40">Cancelar</UButton>
				<UButton size="lg" class="w-40" type="submit" :loading="loading"
					>Registrarme</UButton
				>
			</div>

			<span class="error py-2 inline-block w-full text-center" v-if="error">
				{{ format_error_message_computed }}
				<span
					class="inline-block"
					v-if="
						format_error_message_computed == 'Un registro similar ya existe.'
					"
					>Pruebe cambiando el correo electrónico o el nombre de usuario.</span
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "~/assets/css/vue-datepicker.css";

interface props {
	change_selection: () => void;
	selection: number;
	schema: object;
	on_submit: () => void;
}

import signupData from "~/data/signup.data.js";
import create from "~/helpers/error_message.helper";
//import { format_error_message } from "~/helpers/error_message.helper";

const { selection } = defineProps<props>();

const pastDate = computed(() => {
	let currentDate = new Date();
	let pastDate = new Date(currentDate.getTime());
	return pastDate.setFullYear(currentDate.getFullYear() - 18);
});

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

const state = reactive({
	email: "salvadorcaceresc@gmail.com",
	username: "adrian",
	password: "SALVA1234",
	password_repeat: "SALVA1234",
	phone: "12345678",
	contact: {
		first_name: "Salvador",
		last_name: "Adrian",
		gender: "MALE",
		date_of_birth: new Date("11/11/2000"),
	},
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
				contact {
					first_name
					last_name
					phone
				}
			}
		}
	}
`;

const { mutate: signup, onDone, loading, error, onError } = useMutation(query);

onDone((result) => {
	console.log("positivo");
});

function formatDate(date: Date) {
	let day = date.getDate().toString().padStart(2, "0");
	let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan desde 0
	let year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

const onSubmitt = async () => {
	await signup({
		createUser: {
			email: state.email,
			username: state.username,
			password: state.password,
			contact: {
				phone: parseInt(state.phone! as string),
				first_name: state.contact.first_name,
				last_name: state.contact.last_name,
				gender: state.contact.gender,
				date_of_birth: formatDate(state.contact.date_of_birth! as Date),
			},
		},
		clientRole: {
			role: signupData[selection]?.type,
		},
	});
};

onError((error) => {
	console.log("errors");
	console.log(error.graphQLErrors);
	console.log(error.networkError);
	console.log(error.clientErrors);
	console.log(error.protocolErrors);
});

const format_error_message_computed = create(error);
</script>
