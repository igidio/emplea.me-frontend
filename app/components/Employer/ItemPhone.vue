<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		v-if="!is_editable"
	>
		<div class="flex flex-col gap-2">
			<span>Número telefónico: <span class="font-semibold">{{ phone.phone }}</span></span>
			<span>Tiene Whatsapp: <span class="font-semibold">{{ phone.has_whatsapp ? 'Si' : 'No' }}</span></span>
		</div>
		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar" @click="is_editable = true" size="sm" :disabled="loading_phone_delete"/>
			<UButton color="red" label="Eliminar" @click="remove" size="sm" :disabled="loading_phone_delete"/>
		</div>
	</div>

	<UForm
		class="flex flex-col gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
		:state="state"
		:schema="schema"
		@submit="submit"
		v-else
	>
		<div class="w-full flex flex-cik gap-4">
			<div class="flex flex-col gap-4 w-full">
				<UFormGroup label="Número telefónico" class="grow" name="phone" required>
					<UInput
						color="gray"
						placeholder=""
						v-model="state.phone"
					/>
				</UFormGroup>
				<UCheckbox
					v-model="state.has_whatsapp"
					label="Tiene WhatsApp"
				/>
				<span class="error text-end" v-if="error">{{ error.message }}</span>
				<div class="flex flex-row gap-2 justify-end">
					<UButton color="black" label="Cancelar" @click="cancel" size="sm" :disabled="loading"/>
					<UButton label="Guardar" size="sm" type="submit" :disabled="loading"/>
				</div>
			</div>
		</div>

	</UForm>
</template>

<script setup lang="ts">
import type {PhoneInterface} from "~/interfaces";
import {phone_schema} from "~/schemas";
import {phoneDelete, phoneUpdate} from "~/queries";

const is_editable = ref(false)

interface Props {
	phone: PhoneInterface,
	reload: () => Promise<void>
}

const props = defineProps<Props>()

const schema = phone_schema
const state = reactive({
	phone: props.phone.phone,
	has_whatsapp: props.phone.has_whatsapp
})

const cancel = () => {
	is_editable.value = false
	reset()
}

const reset = () => {
	state.phone = props.phone.phone
	state.has_whatsapp = props.phone.has_whatsapp
	error.value = null
}

const {mutate, loading, error} = useMutation<{ "phoneUpdate": string }>(phoneUpdate)

const submit = async () => {
	console.log(useRoute().params.id)
	await mutate({
		"updatePhoneInput": {
			phone: state.phone,
			id_employer: Number(useRoute().params.id),
			has_whatsapp: state.has_whatsapp,
			id: Number(props.phone.id)
		}
	}).then(async (e) => {
		await props.reload()
		useToast().add({title: e?.data?.phoneUpdate})
		is_editable.value = false
	})
}

const { mutate: mutate_phone_delete, loading: loading_phone_delete } = useMutation<{ phoneDelete: string }>(phoneDelete)

const remove = async () => {
	await mutate_phone_delete({
		"phoneDeleteId": Number(props.phone.id),
		"idEmployer": Number(useRoute().params.id)
	}).then(async (e) => {
		await props.reload()
		useToast().add({title: e?.data?.phoneDelete})
	})
}
</script>