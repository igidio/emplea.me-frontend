<template>
	<UModal v-model="isOpen">
		<UForm
			:state="state"
			:schema="schema"
			@submit="submit"
		>
			<UCard>
				<template #header>Información de contacto</template>
				<div class="grid grid-cols-1 tablet:grid-cols-2 gap-4">
					<UFormGroup
						label="Nombres"
						class="w-full"
						name="first_name">
						<UInput
							placeholder="Tus nombres"
							size="md"
							v-model="state.first_name"
							color="gray"
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
							size="md"
							v-model="state.phone"
							color="gray"
							:ui="{ leading: { padding: { md: 'pl-[45px]'} } }"
						>
							<template #leading>
								<span class="font-bold dark:text-gray-400 text-xs">+591</span>
							</template>
						</UInput>
					</UFormGroup>

					<UFormGroup
						label="Apellidos"
						class="w-full"
						name="last_name"
					>
						<UInput
							placeholder="Tus apellidos"
							size="md"
							v-model="state.last_name"
							color="gray"
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
							color="gray"
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
									color="gray"
									:readonly="true"
								/>
							</template>
						</VueDatePicker>
					</UFormGroup>

					<span class="error mt-2 inline-flex w-full" v-if="error">{{ error.message }}</span>
				</div>
				<template #footer>
					<div class="flex flex-row gap-2 w-full justify-end">
						<UButton color="black" @click="isOpen = false">Cancelar</UButton>
						<UButton :loading="loading" type="submit">Guardar</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import {contactUpdate, userUpdate} from "~/queries";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "~/assets/css/vue-datepicker.css";
import {contact_schema} from "~/schemas";
import * as yup from "yup";
import {GenderEnum} from "~/enums";

const isOpen = defineModel({required: true, default: false});
const { user } = useUserStore();

interface Props {
	phone: string,
	gender: string,
	last_name: string,
	first_name: string,
	date_of_birth: string,
}

const p = defineProps<{ props: Props }>();

const past_date = computed(() => {
	let currentDate = new Date();
	let pastDate = new Date(currentDate.getTime());
	return pastDate.setFullYear(currentDate.getFullYear() - 18);
});

const state = reactive({
	phone: p.props.phone,
	gender: p.props.gender,
	last_name: p.props.last_name,
	first_name: p.props.first_name,
	date_of_birth: new Date(p.props.date_of_birth),
});

const {mutate, error, loading} = useMutation(contactUpdate);

const schema = yup.object(contact_schema)

const submit = async () => {
	await mutate({
		"updateContactInput": {
			"date_of_birth": new Date(state.date_of_birth),
			"first_name": state.first_name,
			"gender": state.gender,
			"last_name": state.last_name,
			"phone": Number(state.phone),
		}
	}).then(() => {
		useToast().add({title: 'Información actualizada correctamente.'});
		user.contact.date_of_birth = new Date(state.date_of_birth).toString();
		user.contact.gender = state.gender as GenderEnum;
		state.first_name = state.first_name.replace(/(^.|\s+.)/g, (char) => char.toUpperCase());
		user.contact.first_name = state.first_name;
		state.last_name = state.last_name.replace(/(^.|\s+.)/g, (char) => char.toUpperCase());
		user.contact.last_name = state.last_name.replace(/(^.|\s+.)/g, (char) => char.toUpperCase());;
		user.contact.phone = state.phone;
		isOpen.value = false;

	});
};
</script>
