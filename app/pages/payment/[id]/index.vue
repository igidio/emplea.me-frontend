<template>
	<GoToPrevious/>
	<div class="flex flex-col tablet:flex-row gap-4 w-full justify-center">
		
		<div class="tablet:w-52 tablet:h-96">
			
			<PaymentOptionCard
				:props="current_plan"
				:index="index"
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
	<PaymentModalQR v-model:is_open="modal_qr_is_open"/>
	<PaymentModalFTF v-model:is_open="modal_ftf_is_open"/>
</template>

<script setup lang="ts">
import {plans} from "~/data/plans.data";

const modal_qr_is_open = ref(false)
const modal_ftf_is_open = ref(false)

const current_plan = ref(plans[Number(useRoute().params.id)])
</script>