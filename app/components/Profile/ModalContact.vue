<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>Información de contacto</template>

			<div class="grid grid-cols-1 tablet:grid-cols-2 gap-4">
				<UFormGroup label="Nombres" class="w-full" name="contact.first_name">
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
					name="contact.phone"
				>
					<UInput
						placeholder="--------"
						size="md"
						v-model="state.phone"
						color="gray"
					>
						<template #leading>
							<span class="font-bold dark:text-gray-400 text-xs">+591</span>
						</template>
					</UInput>
				</UFormGroup>

				<UFormGroup label="Apellidos" class="w-full" name="contact.last_name">
					<UInput
						placeholder="Tus apellidos"
						size="md"
						v-model="state.last_name"
						color="gray"
					/>
				</UFormGroup>

				<UFormGroup label="Género" class="w-full" name="contact.gender">
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
					name="contact.date_of_birth"
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

			<template #footer>
				<div class="flex flex-row gap-2 w-full justify-end">
					<UButton color="black" @click="isOpen = false">Cancelar</UButton>
					<UButton :loading="loading" type="submit">Guardar</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import { userUpdate } from "~/queries";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "~/assets/css/vue-datepicker.css";

const past_date = computed(() => {
	let currentDate = new Date();
	let pastDate = new Date(currentDate.getTime());
	return pastDate.setFullYear(currentDate.getFullYear() - 18);
});

const state = reactive({
	phone: "",
	gender: "",
	last_name: "",
	first_name: "",
	date_of_birth: "",
});

const isOpen = defineModel({ required: true, default: false });

const { mutate, error, loading, onDone } = useMutation(userUpdate);

const on_submit = async () => {
	//await mutate({ updateUserInput: state });
};
</script>
