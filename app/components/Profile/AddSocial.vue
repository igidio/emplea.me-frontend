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
import * as yup from "yup";
import {seeker_social_schema} from "~/schemas";
import type {socialInterface} from "~/interfaces";
import {seekerSocialCreate} from "~/queries";

interface Props {
	data_exists: boolean;
	social: socialInterface[];
	reload: () => Promise<void>;
}

const {reload} = defineProps<Props>()

const is_editable = ref(false)

const schema = yup.object(seeker_social_schema)

const state = reactive({
	name: '',
	identifier: '',
	social: undefined as socialInterface | undefined,
})

const reset = () => {
	state.name = ''
	state.identifier = ''
	state.social = undefined
}

const submit = async () => {

	await mutate({
		"createSeekerSocialInput": {
			"identifier": state.identifier,
			"social": Number(state.social?.id),
			"name": state.name
		}
	}).then(async () => {
		await reload()
		is_editable.value = false;
		useToast().add({title: 'Registro agregado correctamente.'})
		reset()
	})
}

const {mutate, error, loading} = useMutation(seekerSocialCreate)

const cancel = async () => {
	is_editable.value = false;
	reset()
}
</script>