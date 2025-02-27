<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full overflow-hidden"
		v-if="!is_editable"
	>
		<div class="flex flex-col w-full gap-1">
			<div class="flex flex-row gap-4 place-content-between">
				<div class="flex flex-row gap-2 truncate text-wrap">
					<IconFill :name="props.social.icon"/>
					<div class="flex flex-col gap-1">
						<span class="text-sm">{{ props.social?.name }}</span>
						<span class="font-semibold">{{ `${props.name}` }}</span>
					</div>
				</div>

				<div class="flex flex-row gap-2 h-fit">
					<UButton color="black" size="sm" class="h-fit" label="Editar" @click="is_editable = true"/>
					<UButton color="red" size="sm" class="h-fit" label="Eliminar" @click="delete_item()"/>
				</div>
			</div>
			<NuxtLink
				class="text-ellipsis overflow-hidden hyper"
				:to="`${props.social.prefix}${props.identifier}`"
			>{{
					`${props.social.prefix}${props.identifier}`
				}}
			</NuxtLink>
		</div>
	</div>


	<UForm
		class="flex flex-col gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-else
		:state="state"
		:schema="schema"
		@submit="submit"
	>

		<div class="w-full flex flex-col gap-4">
			<div class="flex flex-row gap-2">
				<UFormGroup label="Nombre de perfil" class="w-1/2" name="name">
					<UInput
						color="gray"
						placeholder="Nombre de perfil"
						v-model="state.name"
					/>
				</UFormGroup>
				<UFormGroup label="Red social" class="grow" name="social">
					<USelectMenu
						v-model="state.social"
						:options="social"
						option-attribute="name"
						size="md"
						color="gray"
					/>
				</UFormGroup>
			</div>
			<div class="flex flex-col grow">
				<UFormGroup
					label="Identificador"
					class="grow"
					:help="(state.social?.prefix) && `${state.social?.prefix}${state.identifier}`"
					name="identifier"
				>
					<UInput
						v-model="state.identifier"
						color="gray"
						placeholder="Nombre Apellido"
					/>
				</UFormGroup>
			</div>
		</div>
		<span class="error text-right" v-if="error">{{
				error.message
			}}</span>
		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="loading" @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="loading" :disabled="is_the_same" type="submit"/>
		</div>
	</UForm>

</template>

<script setup lang="ts">
import type {socialInterface} from "~/interfaces";
import * as yup from "yup";
import {employerSocialDelete, employerSocialUpdate} from "~/queries";
import {seeker_social_schema} from "~/schemas";

const loading = ref(false)

interface Props {
	props: {
		id: number;
		name: string;
		identifier: string;
		social: {
			name: string;
			icon: string;
			prefix: string;
			id?: number;
		};
	}
	social: socialInterface[] | undefined
	reload: () => Promise<void>
}

const p = defineProps<Props>();

const is_editable = ref(false)

const state = reactive({
	name: p.props.name,
	identifier: p.props.identifier,
	social: p.props.social
})

const cancel = () => {
	is_editable.value = false;
	reset()
}

const reset = () => {
	state.name = p.props.name;
	state.identifier = p.props.identifier;
	state.social = p.props.social;
}

const schema = yup.object(seeker_social_schema)

const {mutate, error} = useMutation<{ employerSocialUpdate: string }>(employerSocialUpdate)

const submit = async () => {
	loading.value = true;
	await mutate({
		"updateEmployerSocialInput": {
			"name": state.name,
			"identifier": state.identifier,
			"id_employer": Number(useRoute().params.id),
			"id_social": Number(state.social.id),
			"id": Number(p.props.id)
		}
	})
		.then(async (r) => {
			is_editable.value = false;
			useToast().add({title: r?.data?.employerSocialUpdate})
			await p.reload()
			reset()
		}).catch((e: Error) => {
			console.log(e)
		}).finally(() => {
			loading.value = false;
		})
}

const {mutate: mutate_delete_seekerSocial,} = useMutation<{ employerSocialDelete: string }>(employerSocialDelete)
const delete_item = async () => {
	await mutate_delete_seekerSocial({
		"employerSocialDeleteId": Number(p.props.id),
		"idEmployer": Number(useRoute().params.id)
	}).then(async (r) => {
		loading.value = true;
		useToast().add({title: r?.data?.employerSocialDelete})
		await p.reload()
	}).catch((e: Error) => {
		console.log(e)
	}).finally(() => {
		loading.value = false;
	})
}

const is_the_same = computed(() => {
	return state.name === p.props.name && state.identifier === p.props.identifier && state.social.id === p.props.social.id
})
</script>