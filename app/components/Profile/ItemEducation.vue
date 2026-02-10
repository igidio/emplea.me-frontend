<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-if="!is_editable"
	>
		<div class="flex flex-row gap-4">
			<IconFill
				name="ri:school-fill"
			/>
			<div class="flex flex-col">
				<span class="font-semibold">{{ props.institute.name }}</span>
				<span>{{ props.title }}</span>
				<span class="text-sm">{{
						DegreeEnum[props.degree as keyof typeof DegreeEnum]
					}} {{ props.subtitle && ` - ${props.subtitle}` }}</span>
				<span class="text-sm">
					{{ set_education_years({ starting_year: props.starting_year, completion_year: props.completion_year}) }}
				</span>
			</div>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar" @click="is_editable = true" size="sm"/>
			<UButton color="red" label="Eliminar" size="sm" :loading="loading_delete_skill" @click="delete_skill"/>
		</div>
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
				<UFormGroup label="Título" class="grow" name="title" required>
					<UInput
						color="gray"
						placeholder=""
						v-model="state.title"
					/>
				</UFormGroup>
				<div class="flex flex-row gap-2">
					<UFormGroup
						label="Institución educativa"
						class="w-full"
						name="institute"
						:help="(state.institute) ? `Selección: ${state.institute.name}` : 'Selecciona una institución educativa'"
						required
					>
						<UInputMenu
							color="gray"
							v-model="state.institute"
							:search="search_institute"
							:loading="loading_find_any_institute"
							trailing
							placeholder="Busca una institución educativa"
							option-attribute="name"
						/>
					</UFormGroup>


				</div>
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
		<span class="error" v-if="education_update_error">{{ education_update_error.message }}</span>
		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="education_update_loading"
			         @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="education_update_loading"
			         type="submit"/>
		</div>

	</UForm>
</template>

<script setup lang="ts">
import {DegreeEnum} from "~/enums";
import type {instituteInterface, skillInterface} from "~/interfaces";
import {educationDelete, educationUpdate, instituteFindAny, seekerSkillUpdate} from "~/queries";
import {enum_to_array, filter_input_menu, set_education_years} from "~/helpers";
import {education_schema} from "~/schemas";

interface Props {
	id: number,
	institute: instituteInterface;
	title: string;
	subtitle: string;
	degree: string;
	starting_year?: number;
	completion_year?: number;
}

const p = defineProps<{ props: Props, reload: () => Promise<void> }>();
const schema = education_schema
const state = reactive({
	title: p.props.title,
	institute: p.props.institute,
	subtitle: p.props.subtitle,
	degree: p.props.degree,
	starting_year: p.props.starting_year,
	completion_year: p.props.completion_year
})

const is_editable = ref(false)

const cancel = () => {
	is_editable.value = false
}

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
	loading: education_update_loading,
	error: education_update_error
} = useMutation<{ educationUpdate: string }>(educationUpdate)

const submit = async () => {
	await update({
		"updateEducationInput": {
			"id": Number(p.props.id),
			"institute": state.institute.name,
			"title": state.title,
			"degree": state.degree,
			"starting_year": state.starting_year,
			"completion_year": state.completion_year,
			"subtitle": state.subtitle
		}
	}).then(async (r) => {
		await p.reload()
		useToast().add({title: r?.data?.educationUpdate})
		is_editable.value = false;
		reset()
	}).catch((e: Error) => {
		console.log(e)
	})
}

const reset = () => {
	state.institute = p.props.institute
	state.degree = p.props.degree
	state.starting_year = p.props.starting_year
	state.completion_year = p.props.completion_year
	state.subtitle = p.props.subtitle
	state.title = p.props.title
}

const {
	mutate: delete_education_mutation,
	loading: loading_delete_skill,
} = useMutation<{educationDelete: string }>(educationDelete)

const delete_skill = async () => {
	await delete_education_mutation({
		"educationDeleteId": Number(p.props.id)
	}).then(async (r) => {
		await p.reload()
		useToast().add({title: r?.data?.educationDelete})
	}).catch((e: Error) => {
		console.log(e)
	})
}
</script>