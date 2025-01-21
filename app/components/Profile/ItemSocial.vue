<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-if="!is_editable"
	>
		<div class="flex flex-row gap-4">
			<IconFill :name="props.social.icon"/>
			<div class="flex flex-col">
				<span class="text-sm">{{ props.social?.name }}</span>
				<span class="font-semibold">{{ `${props.name}` }}</span>
				<NuxtLink :to="`${props.social.prefix}${props.identifier}`"><span>{{
						`${props.social.prefix}${props.identifier}`
					}}</span></NuxtLink>

			</div>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar" @click="is_editable = true"/>
			<UButton color="red" label="Eliminar"/>
		</div>


	</div>


	<UForm
		class="flex flex-col gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-else
		:state="state"
		:schema="schema"
		@submit="submit"
	>

		<div class="w-full flex flex-row gap-4">
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
		<div class="flex flex-row gap-2 h-fit self-end">
			<UButton color="red" label="Cancelar" :loading="loading" @click="cancel()"/>
			<UButton color="black" label="Guardar" :loading="loading" type="submit"/>
		</div>
	</UForm>

</template>

<script setup lang="ts">
import type {socialInterface} from "~/interfaces";
import * as yup from "yup";
import {seekerSocialUpdate} from "~/queries";

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
	name: yup.string().required('El nombre de perfil es requerido'),
	identifier: yup.string().matches(/^[a-zA-Z0-9_]*$/, "Solo letras y números").required('El identificador es requerido'),
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

const { mutate } = useMutation(seekerSocialUpdate(variables.value))

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
		.then((r) => {
			is_editable.value = false;
			useToast().add({title: r?.data.seekerSocialUpdate})
			set()
		}).catch((e) => {
			console.log(e.data)
			console.log(e.message)
		}).finally(() => {
			loading.value = false;
		})
}
</script>