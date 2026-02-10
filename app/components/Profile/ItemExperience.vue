<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-if="!is_editable"
	>
		<div class="flex flex-row gap-4">
			<item
				icon="ri:briefcase-4-fill"
				:label="props.company"
				:label_bold="props.title"
				:small="date_ranges"
				:description="props.description ? props.description : undefined"
			/>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar" size="sm" @click="is_editable = true"
			         :disabled="experience_delete_loading"/>
			<UButton color="red" label="Eliminar" size="sm" @click="delete_experience" :disabled="experience_delete_loading"/>
		</div>
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

		<span class="error" v-if="experience_update_error">{{ experience_update_error.message }}</span>

		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="experience_update_loading"
			         @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="experience_update_loading"
			         type="submit"/>
		</div>

	</UForm>
</template>

<script setup lang="ts">
import {experience_schema} from "~/schemas/experience.schema";
import {get_date_mmyy, split_date} from "~/helpers";
import {experienceDelete, experienceUpdate} from "~/queries";
import {months} from "~/data/months";

interface Props {
	id: number,
	title: string,
	start_date: Date | undefined,
	end_date: Date | undefined,
	company: string,
	description: string,
}

const p = defineProps<{ props: Props, reload: () => Promise<void> }>();

const is_editable = ref(false);
const schema = experience_schema

const state_error = reactive({
	starting_month: '',
	starting_year: '',
	completion_month: '',
	completion_year: ''
})

const state = reactive({
	title: p.props.title,
	company: p.props.company,
	description: p.props.description,
	starting_year: (p.props.start_date) ? split_date(p.props.start_date).year : null,
	starting_month: (p.props.start_date) ? split_date(p.props.start_date).month_index : null,
	completion_year: (p.props.end_date) ? split_date(p.props.end_date).year : null,
	completion_month: (p.props.end_date) ? split_date(p.props.end_date).month_index : null,
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
	mutate: experience_update_mutate,
	loading: experience_update_loading,
	error: experience_update_error
} = useMutation<{ educationUpdate: string }>(experienceUpdate)

const submit = async () => {
	if (!validate()) return;
	await experience_update_mutate({
		"updateExperienceInput": {
			"id": Number(p.props.id),
			"title": state.title,
			"company": state.company,
			"description": state.description && state.description,
			"starting_month": (state.starting_month) ? Number(state.starting_month) : null,
			"starting_year": state.starting_year ? Number(state.starting_year) : null,
			"completion_month": state.completion_month ? Number(state.completion_month) : null,
			"completion_year": state.completion_year ? Number(state.completion_year) : null,
		}
	}).then(async (r) => {
		await p.reload()
		useToast().add({title: "Experiencia laboral actualizada exitósamente."})
		is_editable.value = false
	}).catch((e: Error) => {
		console.log(e)
	})
}

const date_ranges = computed(() => get_date_mmyy({start_date: p.props.start_date, end_date: p.props.end_date}))

const cancel = () => {
	is_editable.value = false
	reset()
}

const reset = () => {
	state.title = p.props.title
	state.company = p.props.company
	state.description = p.props.description
	state.starting_year = (p.props.start_date) ? split_date(p.props.start_date).year : null
	state.starting_month = (p.props.start_date) ? split_date(p.props.start_date).month_index : null
	state.completion_year = (p.props.end_date) ? split_date(p.props.end_date).year : null
	state.completion_month = (p.props.end_date) ? split_date(p.props.end_date).month_index : null
}

const {
	mutate: experience_delete_mutate,
	loading: experience_delete_loading,
} = useMutation<{ experienceDelete: string }>(experienceDelete)

const delete_experience = async () => {
	await experience_delete_mutate({
		"experienceDeleteId": Number(p.props.id)
	}).then(async (r) => {
		await p.reload()
		useToast().add({title: "Experiencia laboral eliminada exitósamente."})
	}).catch((e: Error) => {
		console.log(e)
	})
}
</script>