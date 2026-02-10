<template>
	<div v-if="!is_editable" class="flex flex-col gap-2">
		<div
			class="flex flex-row gap-4 place-content-between p-4 rounded-medium dotted w-full overflow-hidden"
			v-if="!data_exists"
		>
			<span class="text-center w-full font-semibold text-violet-600">
				Prueba agregando elementos
			</span>
		</div>
		<UButton
			color="black"
			icon="ri:add-fill"
			block
			label="Agregar"
			@click="is_editable = true"
		/>
	</div>

	<UForm
		class="flex flex-col gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		:state="state"
		@submit="submit"
		:schema="schema"
		v-else
	>
		<div class="flex flex-row">
			<UFormGroup name="title" label="Título" class="w-full" required>
				<UInput color="gray" size="md" v-model="state.title"/>
			</UFormGroup>
		</div>

		<div class="flex flex-row">
			<UFormGroup name="company" label="Nombre de la compañía" class="w-full" required>
				<UInput color="gray" size="md" v-model="state.company"/>
			</UFormGroup>
		</div>

		<div class="flex flex-row gap-2">
			<UFormGroup
				name="starting_month"
				label="Mes de Inicio"
				class="w-1/2"
				:error="state_error.starting_month"
			>
				<USelect
					color="gray"
					size="md"
					:options="months"
					v-model="state.starting_month"
					@change="validate"
				/>
			</UFormGroup>
			<UFormGroup
				name="starting_year"
				label="Año de inicio"
				class="w-1/2"
				:error="state_error.starting_year"
			>
				<UInput
					color="gray"
					v-model="state.starting_year"
					@keyup="validate" type="number"
				/>
			</UFormGroup>
		</div>

		<div class="flex flex-row gap-2">
			<UFormGroup
				name="completion_month"
				label="Mes de Finalización"
				class="w-1/2"
				:error="state_error.completion_month"
			>
				<USelect color="gray" size="md" :options="months" v-model="state.completion_month" @change="validate"/>
			</UFormGroup>
			<UFormGroup
				name="completion_year"
				label="Año de finalización"
				class="w-1/2"
				:error="state_error.completion_year"
			>
				<UInput color="gray" v-model="state.completion_year" @keyup="validate" type="number"/>
			</UFormGroup>
		</div>

		<div class="flex flex-row">
			<UFormGroup name="description" label="Descripción" class="w-full">
				<UTextarea
					color="gray"
					size="md"
					v-model="state.description"
				/>
			</UFormGroup>
		</div>

		<span class="error" v-if="experience_create_error">{{ experience_create_error.message }}</span>

		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="experience_create_loading"
			         @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="experience_create_loading"
			         type="submit"/>
		</div>

	</UForm>
</template>

<script setup lang="ts">
import {experienceCreate} from "~/queries";
import {experience_schema} from "~/schemas/experience.schema";
import {months} from "~/data/months";

const is_editable = ref(false)

interface Props {
	data_exists: boolean
	reload: () => Promise<void>
}

const p = defineProps<Props>()
const schema = experience_schema

const state_error = reactive({
	starting_month: '',
	starting_year: '',
	completion_month: '',
	completion_year: ''
})

const state = reactive({
	title: '',
	company: '',
	description: '',
	starting_year: null,
	starting_month: null,
	completion_year: null,
	completion_month: null,
});

const validate = () => {
	if ((!state.starting_month && state.starting_year) || (state.starting_month && !state.starting_year)) {
		state_error.starting_month = 'El mes y el año de conclusión deben ir juntos.';
		state_error.starting_year = 'El mes y el año de conclusión deben ir juntos.';
		return false;
	} else {
		state_error.starting_month = '';
		state_error.starting_year = '';
	}

	if ((!state.completion_month && state.completion_year) || (state.completion_month && !state.completion_year)) {
		state_error.completion_month = 'El mes y el año de inicio deben ir juntos.';
		state_error.completion_year = 'El mes y el año de inicio deben ir juntos.';
		return false;
	} else {
		state_error.completion_month = '';
		state_error.completion_year = '';
	}

	if (state.starting_month && state.completion_month && state.starting_year === state.completion_year && state.starting_month >= state.completion_month) {
		state_error.completion_month = 'El mes de finalización debe ser mayor al mes';
		state_error.starting_month = 'El mes de finalización debe ser mayor al mes';
		return false
	}
	return true;
}

const {
	mutate: experience_create_mutate,
	loading: experience_create_loading,
	error: experience_create_error
} = useMutation<{ experienceCreate: string }>(experienceCreate)

const submit = async () => {
	if (!validate()) return;
	await experience_create_mutate({
		"createExperienceInput": {
			"title": state.title,
			"company": state.company,
			"description": state.description && state.description,
			"starting_month": state.starting_month ? Number(state.starting_month) : null,
			"starting_year": state.starting_year ? Number(state.starting_year) : null,
			"completion_month": state.completion_month ? Number(state.completion_month) : null,
			"completion_year": state.completion_year ? Number(state.completion_year) : null,
		}
	}).then(async (r) => {
		await p.reload()
		useToast().add({title: "Experiencia laboral creada exitósamente."})
		is_editable.value = false
		reset()
	}).catch((e: Error) => {
		console.log(e)
	})
}

const cancel = () => {
	is_editable.value = false
	reset()
}

const reset = () => {
	state.title = ''
	state.company = ''
	state.description = ''
	state.starting_year = null
	state.starting_month = null
	state.completion_year = null
	state.completion_month = null
}
</script>