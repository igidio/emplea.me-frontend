<template>
	<div v-if="!is_editable" class="flex flex-col gap-2">
		<UButton
			color="black"
			icon="ri:add-fill"
			block
			label="Agregar"
			@click="is_editable = true"
		/>
		<div
			class="flex flex-row gap-4 place-content-between p-4 rounded-medium dotted w-full overflow-hidden"
			v-if="!data_exists"
		>
			<span class="text-center w-full font-semibold text-violet-600">
				Prueba agregando elementos
			</span>
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
			<div class="flex flex-row gap-2">
				<UFormGroup
					label="Nombre de habilidad"
					class="w-1/2"
					name="name"
					:help="(state.skill && Object.keys(state.skill).length > 0) ? `Selección: ${state.skill.name}` : 'Selecciona o crea una habilidad'"
				>
					<UInputMenu
						color="gray"
						v-model="state.skill"
						:search="search_skill"
						:loading="loading_find_any_skill"
						trailing
						placeholder="Busca una habilidad"
						option-attribute="name"
					/>
				</UFormGroup>
				<UFormGroup label="Nivel" class="grow" name="level">
					<USelectMenu
						v-model="state.level"
						:options="[
							{ label: 'No indicar', value: undefined},
							{ label: 'Básico', value: 'BASIC' },
							{ label: 'Intermedio', value: 'INTERMEDIATE' },
							{ label: 'Avanzado', value: 'ADVANCED' }
						]"
						option-attribute="label"
						value-attribute="value"
						size="md"
						color="gray"
					/>
				</UFormGroup>

			</div>
			<span v-if="error" class="error text-right">{{
					error.name === 'ApolloError'
						? 'La habilidad introducida no es válida, es posible que ya hayas registrado dicha habilidad.'
						: error.message
				}}</span>
		</div>
		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="loading" @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="loading" type="submit"/>
		</div>
	</UForm>
</template>

<script setup lang="ts">
import type {Reactive} from "vue";
import type {postSkillInterface, skillInterface} from "~/interfaces";
import {seeker_skill_schema} from "~/schemas";
import {gqlPostSkill, seekerFindAny, seekerSkillCreate, seekerSkillDelete} from "~/queries";
import {filter_input_menu} from "~/helpers";

const is_editable = ref(false);

interface Props {
	data_exists: boolean;
	reload: () => Promise<void>
}

const {reload} = defineProps<Props>();
const schema = seeker_skill_schema

const state: Reactive<{
	skill: skillInterface;
	level: string | undefined;
}> = reactive({
	skill: {} as skillInterface,
	level: undefined
})

const reset = () => {
	state.skill = {} as skillInterface;
	state.level = undefined;
}

const cancel = () => {
	is_editable.value = false;
	reset()
}

const {
	mutate: create,
	loading,
	error
} = useMutation<{ postSkillCreate: postSkillInterface }>(gqlPostSkill.create)

const submit = async () => {
	await create({
		"createSeekerSkillInput": {
			"level": state.level,
			"name": state.skill.name
		},
		"postId": +(useRoute().params.id!)
	}).then(async (r) => {
		await reload()
		console.log(r)
		useToast().add({title: "Habilidad creada exitósamente."})
		is_editable.value = false;
		reset()
	}).catch((e: Error) => {
		console.log(e)
	})
}

const {
	mutate: find_any_skill,
	loading: loading_find_any_skill,
} = useMutation<{
	skillFindAny: skillInterface[]
}>(seekerFindAny)

const search_skill = async (q: string) => {
	1
	console.log(q)
	const search = await find_any_skill({
		"findAnySeekerInput": {
			"filter": q,
			"limit": 10,
			"offset": 0
		}
	})

	if (search?.data?.skillFindAny === undefined) return

	return filter_input_menu({
		menu_items: search?.data?.skillFindAny!,
		property_to_filter: 'name',
		search_term: q
	})
}
</script>