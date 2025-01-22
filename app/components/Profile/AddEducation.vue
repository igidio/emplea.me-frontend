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
		:schema="schema"
		@submit="submit"
		v-else
	>
		<div class="w-full flex flex-col gap-4">
			<div class="flex flex-col gap-4">

				<div class="flex flex-row gap-2">
					<UFormGroup
						label="Institución educativa"
						class="w-full"
						name="institute"
						:help="(state.institute && state.institute.name) ? `Selección: ${state.institute.name}` : 'Selecciona una institución educativa'"
						required
					>
						<UInputMenu
							color="gray"
							v-model="state.institute"
							:search="search_institute"
							:loading="loading_find_any_institute"
							trailing
							placeholder="Busca una habilidad"
							option-attribute="name"
						/>
					</UFormGroup>


				</div>
				<UFormGroup label="Título" class="grow" name="title" required>
					<UInput
						color="gray"
						placeholder=""
						v-model="state.title"
					/>
				</UFormGroup>
				<div class="flex flex-row gap-2">
					<UFormGroup label="Grado" class="w-1/2" name="degree" required>
						<USelectMenu
							v-model="state.degree"
							:options="enum_to_array(DegreeEnum)"
							option-attribute="label"
							value-attribute="value"
							size="md"
							color="gray"
						/>
					</UFormGroup>

					<UFormGroup label="sbtlo." class="grow" name="subtitle">
						<UInput
							color="gray"
							placeholder="Mención, especialidad, etc."
							v-model="state.subtitle"
						/>
					</UFormGroup>
				</div>
				<div class="flex flex-row gap-2">
					<UFormGroup label="Año de inicio" class="w-1/2" name="starting_year">
						<UInput color="gray" v-model="state.starting_year"/>
					</UFormGroup>
					<UFormGroup label="Año de finalización" class="grow" name="completion_year">
						<UInput color="gray" v-model="state.completion_year"/>
					</UFormGroup>
				</div>
			</div>
		</div>
		<span class="error" v-if="education_create_error">{{ education_create_error.message }}</span>
		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="education_create_loading"
			         @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="education_create_loading"
			         type="submit"/>
		</div>

	</UForm>
</template>

<script setup lang="ts">
import {enum_to_array, filter_input_menu} from "~/helpers";
import {DegreeEnum} from "~/enums";
import type {educationInterface, instituteInterface, skillInterface} from "~/interfaces";
import {education_schema} from "~/schemas";
import {educationCreate, instituteFindAny} from "~/queries";

const is_editable = ref(false)

interface Props {
	data_exists: boolean
	reload: () => Promise<void>
}

const state = reactive({
	institute: null as instituteInterface | null,
	title: undefined,
	subtitle: undefined,
	degree: undefined,
	starting_year: undefined,
	completion_year: undefined
})
const schema = education_schema

const p = defineProps<Props>()

const {
	mutate: find_any_institute,
	loading: loading_find_any_institute,
} = useMutation<{
	instituteFindAny: skillInterface[]
}>(instituteFindAny)

const search_institute = async (q: string) => {
	const search = await find_any_institute({
		"findAnyInstituteInput": {
			"filter": q,
			"limit": 10,
			"offset": 0
		}
	})
	if (search?.data?.instituteFindAny === undefined) return

	return filter_input_menu({
		menu_items: search?.data?.instituteFindAny,
		property_to_filter: 'name',
		search_term: q
	})
}

const {
	mutate: update,
	loading: education_create_loading,
	error: education_create_error
} = useMutation<{ educationCreate: educationInterface }>(educationCreate)

const submit = async () => {
	await update({
		"createEducationInput": {
			"title": state.title,
			"degree": state.degree,
			"completion_year": state.completion_year,
			"starting_year": state.starting_year,
			"institute": state.institute?.id,
			"subtitle": state.subtitle
		}
	}).then(async () => {
		await p.reload()
		is_editable.value = false
		useToast().add({title: 'Registro agregado correctamente.'})
		reset()
	})
}

const cancel = () => {
	is_editable.value = false
	reset()
}

const reset = () => {
	state.institute = {} as instituteInterface
	state.title = undefined
	state.subtitle = undefined
	state.degree = undefined
	state.starting_year = undefined
	state.completion_year = undefined
}
</script>