<template>
	<div class="flex flex-row gap-4 w-full justify-center">
		
		<div class="w-52 h-96">
			
			<PaymentOptionCard
				:props="current_plan"
				:index="index"
				:show_select_button="false"
			/>
		</div>
		<div class="flex flex-col gap-4 w-96">
			<span class="font-semibold">Selecciona un método de pago</span>
			<UButton color="primary" size="lg" label="Pagar con tarjeta"/>
			<UButton color="primary" size="lg" label="Pagar con QR"/>
			<UButton color="primary" size="lg" label="Pago presencial" @click="f2f = true"/>
			<div class="rounded-medium bg-white p-4" v-if="f2f">
				Apersónate en una de las sucursales de Empleame que tenemos en el país, puedes conocer
				cual es la más cercana a tí por acá.
			</div>
		</div>
		

	</div>
</template>

<script setup lang="ts">
const f2f = ref(false)

import {plans} from "~/data/plans.data";

const current_plan = ref(plans[useRoute().params.id])
</script>