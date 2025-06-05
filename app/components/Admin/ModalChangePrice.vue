<template>
	<UModal v-model="is_open">
		<UForm
			:schema="schema"
			:state="state"
			@submit="submit"
		>
			<!--			:loading="loading"-->
			<UCard>
				<template #header>Cambiar precio</template>
				<div class="flex flex-col gap-4">
					<p>El precio se aplicará a todas las transacciones que se realicen de ahora en adelante.</p>
					<UFormGroup
						name="price"
					>
						<UInput
							color="gray"
							placeholder="Precio"
							v-model="state.price"
							type="number"
						/>
					</UFormGroup>
					<div class="text-end">
						<span v-if="error" class="error text-end">{{ error.message }}</span>
					</div>

				</div>
				<template #footer>
					<div class="flex flex-rowb gap-2 w-full justify-end">
						<UButton
							color="black"
							@click="() => {is_open = false; state.price = ''}"
						>
							Cancelar
						</UButton>
						<UButton
							type="submit"
						>
							<!--							:disabled="loading"-->
							Enviar
						</UButton>
					</div>
				</template>
			</UCard>
		</UForm>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";
import * as yup from "yup";
import {gqlCommon, gqlConfirmation} from "~/queries";

const {plans} = storeToRefs(usePostStore())

const props = defineProps<{ selected_plan: number }>()
const { selected_plan } = toRefs(props)
const is_open: ModelRef<boolean> = defineModel('is_open', {required: true, type: Boolean});
const state = reactive({
	price: ""
})

const schema = yup.object({
	price: yup
		.number()
		.typeError('Debe ser un número')
		.transform((value) => Number.isNaN(value) ? null : value)
		.required("El precio es obligatorio")
		.positive("El precio debe ser mayor a 0")
})

const {mutate, loading, error} = useMutation<{ planChangePlanPrice: string }>(gqlCommon.change_plan_price)

const submit = async () => {
	console.log(selected_plan)
	console.log(plans.value[selected_plan.value - 1]!.id)
	await mutate({
		"planChangePlanPriceId": selected_plan.value,
		"price": +state.price
	}).then(() => {
		plans.value[selected_plan.value+1]!.price = +state.price
		is_open.value = false
		useToast().add({title: 'Precio cambiado.'})
	})

}
</script>