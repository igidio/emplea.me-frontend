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

		<div class="w-full flex flex-row gap-4 overflow-hidden">
			<div class="flex flex-col w-1/2 gap-2">
				<UFormGroup label="Nombre de perfil" class="grow" name="name">
					<UInput
						color="gray"
						placeholder="Nombre de perfil"
						v-model="state.name"
					/>
				</UFormGroup>
				<UFormGroup
					label="Identificador"
					class="grow"
					:help="`${state.social.prefix}${state.identifier}`"
					name="identifier"
				>
					<UInput
						v-model="state.identifier"
						color="gray"
						placeholder="Nombre Apellido"
					/>
				</UFormGroup>
			</div>
			<div class="flex flex-col grow">
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
		</div>
		<span class="error text-right" v-if="error">{{
				error.name === 'ApolloError'
					? 'Los valores introducidos no son válidos, es posible que ya exista un identificador en la misma red social ya registrada'
					: error.message
			}}</span>
		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" size="sm" class="h-fit" :loading="loading" @click="cancel()"/>
			<UButton color="black" label="Guardar" size="sm" class="h-fit" :loading="loading" type="submit"/>
		</div>
	</UForm>

</template>

<script setup lang="ts">
import type {socialInterface} from "~/interfaces";
import * as yup from "yup";
import {seekerSocialDelete, seekerSocialUpdate} from "~/queries";

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

const schema = yup.object({
	name: yup.string().max(60, 'El número máximo de carácteres es de 60').required('El nombre de perfil es requerido'),
	identifier: yup.string().matches(/^[a-zA-Z0-9_]*$/, "Solo letras y números").max(60, 'El número máximo de carácteres es de 60').required('El identificador es requerido'),
	social: yup.object().shape({
		id: yup.number().required()
	})
})

const variables = ref({
	id: p.props.id,
	name: state.name,
	identifier: state.identifier,
	social: state.social.id!
})

const {mutate, error} = useMutation(seekerSocialUpdate(variables.value))
const {mutate: mutate_delete_seekerSocial,} = useMutation(seekerSocialDelete)

const submit = async () => {
	loading.value = true;
	await mutate({
		"updateSeekerSocialInput": {
			"identifier": state.identifier,
			"name": state.name,
			"social": state.social.id!
		},
		"seekerSocialUpdateId": Number(p.props.id)
	})
		.then(async (r) => {
			is_editable.value = false;
			useToast().add({title: r?.data.seekerSocialUpdate})
			await p.reload()
			reset()
		}).catch((e: Error) => {
		}).finally(() => {
			loading.value = false;
		})
}

const delete_item = async () => {
	await mutate_delete_seekerSocial({"seekerSocialDeleteId": Number(p.props.id)}).then(async (r) => {
		loading.value = true;
		useToast().add({title: r?.data.seekerSocialDelete})
		await p.reload()
	}).catch((e: Error) => {
	}).finally(() => {
		loading.value = false;
	})
}
</script>