<template>
	<GoToPrevious/>
	<div
		class="flex flex-col tablet:flex-row gap-4 w-full justify-center"
		v-if="current_plan"
	>

		<div class="tablet:w-52 tablet:h-96">

			<PaymentOptionCard
				:props="current_plan!"
				:show_select_button="false"
			/>
		</div>
		<div class="flex flex-col gap-4 w-full tablet:w-96">
			<span class="font-semibold">Selecciona un método de pago</span>
			<UButton color="primary" size="lg" label="Pagar con tarjeta" :to="`${useRoute().params.id}/order`"/>
			<UButton
				color="primary"
				size="lg"
				label="Pagar con QR"
				@click="modal_qr_is_open = true"
			/>
			<UButton color="primary" size="lg" label="Pago presencial" @click="modal_ftf_is_open = true"/>
		</div>

	</div>

	<div v-else class="h-full w-full text-center ">
		Redirigiendo...
	</div>

	<PaymentModalQR v-model:is_open="modal_qr_is_open"/>
	<PaymentModalFTF v-model:is_open="modal_ftf_is_open"/>
</template>

<script setup lang="ts">
import {plans} from "~/data/plans.data";

const modal_qr_is_open = ref(false)
const modal_ftf_is_open = ref(false)

if (import.meta.client) {
	if (
		!useRoute().params.id ||
		!plans[Number(useRoute().params.id!)] ||
		Number(useRoute().params.id) <= 0
	) {
		useRouter().push('/payment')
	}
}

const current_plan = ref(Number(useRoute().params.id) > 0 && plans[Number(useRoute().params.id!)])
</script>