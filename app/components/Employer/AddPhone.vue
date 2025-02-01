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
import {phone_schema} from "~/schemas";
import type {PhoneInterface} from "~/interfaces";
import {phoneCreate} from "~/queries";

const is_editable = ref(false)

interface Props {
	data_exists: boolean,
	reload: () => Promise<void>
}

const props = defineProps<Props>()

const schema = phone_schema
const state = reactive({
	phone: '',
	has_whatsapp: false
})

const cancel = () => {
	is_editable.value = false
	reset()
}

const reset = () => {
	state.phone = ''
	state.has_whatsapp = false
	error.value = null
}

const {mutate, error, loading} = useMutation<{ 'phoneCreate': PhoneInterface }>(phoneCreate)

const submit = async () => {
	await mutate({
		"createPhoneInput": {
			"phone": state.phone,
			"id_employer": Number(useRoute().params.id),
			"has_whatsapp": state.has_whatsapp
		}
	}).then(async () => {
		reset()
		is_editable.value = false
		useToast().add({title: 'Teléfono agregado exitósamente.'})
		await props.reload()
	})
}
</script>