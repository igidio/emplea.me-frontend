<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-if="!is_editable"
	>
		<div class="flex flex-row gap-4">
			<IconFill
				:name="
					props.level
					? skill_level_icon[props.level as keyof typeof skill_level_icon]
					: 'ri:checkbox-blank-circle-line'"
			/>
			<div class="flex flex-col">
				<span class="font-semibold">{{ props.skill.name }}</span>
				<span
					class="text-sm"
					v-if="props.level"
				>{{ `${SkillLevelEnum[props.level as keyof typeof SkillLevelEnum]}` }}</span>
			</div>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar" @click="is_editable = true" size="sm" class="h-fit"/>
			<UButton color="red" label="Eliminar" size="sm" class="h-fit" @click="delete_skill" />
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
					:help="(state.skill) ? `Selección: ${state.skill.name}` : 'Selecciona o crea una habilidad'"
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
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="loading" :disabled="is_the_same"
			         type="submit"/>
		</div>
	</UForm>
</template>

<script setup lang="ts">
import {SkillLevelEnum} from "~/enums";
import {seeker_skill_schema} from "~/schemas";
import {seekerFindAny, seekerSkillDelete, seekerSkillUpdate} from "~/queries";
import type {skillInterface} from "~/interfaces";
import {filter_input_menu} from "~/helpers";
import type {Reactive} from "vue";

const is_editable = ref(false)
const schema = seeker_skill_schema

interface Props {
	id: number;
	skill: skillInterface;
	level?: string;
	icon: string;
	reload: () => Promise<void>
}

const p = defineProps<{ props: Props }>();

const skill_level_icon = {
	'BASIC': 'ri:progress-2-line',
	'INTERMEDIATE': 'ri:progress-5-line',
	'ADVANCED': 'ri:progress-8-line',
}

const state: Reactive<{
	skill: skillInterface;
	level: string | undefined;
}> = reactive({
	skill: p.props.skill,
	level: p.props.level
})

const cancel = () => {
	is_editable.value = false;
	reset()
}
const reset = () => {
	state.skill = p.props.skill;
	state.level = p.props.level;
	error.value = null
}

const {
	mutate: update,
	loading,
	error
} = useMutation<{ seekerSkillUpdate: string }>(seekerSkillUpdate)

const {
	mutate: find_any_skill,
	loading: loading_find_any_skill,
} = useMutation<{
	skillFindAny: skillInterface[]
}>(seekerFindAny)

const search_skill = async (q: string) => {
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

const is_the_same = computed(() => {
	if (!state.skill) return true
	return state.skill === p.props.skill && state.level == p.props.level
})

const submit = async () => {
	await update({
		"updateSeekerSkillInput": {
			"id": Number(p.props.id),
			"level": state.level,
			"name": state.skill.name
		}
	}).then(async (e) => {
		await p.props.reload()
		useToast().add({title: e?.data?.seekerSkillUpdate})
		is_editable.value = false;
	}).catch((e: Error) => {
		console.log(e)
	})
}

const {
	mutate: delete_skill_mutation,
	loading: loading_delete_skill,
} = useMutation<{seekerSkillDelete: string }>(seekerSkillDelete)

const delete_skill = async () => {
	await delete_skill_mutation({
		"seekerSkillDeleteId": Number(p.props.id)
	}).then(async (r) => {
		await p.props.reload()
		useToast().add({title: r?.data?.seekerSkillDelete})
	}).catch((e: Error) => {
		console.log(e)
	})
}
</script>