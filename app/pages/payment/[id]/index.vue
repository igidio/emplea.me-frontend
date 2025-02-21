<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Sé un premium',
      to: '/payment'
		}, {
			label: current_plan?.name,
			to: `/payment/${current_plan?.name}`
		}]" v-if="current_plan"/>

		<div
			class="flex flex-col tablet:flex-row gap-8 w-full justify-center"
			v-if="current_plan"
		>

			<div class="tablet:w-52 tablet:h-96">

				<PaymentOptionCard
					:props="current_plan!"
					:show_select_button="false"
				/>
			</div>
			<div class="flex flex-col gap-4 w-full tablet:w-96 justify-center">
				<span class="font-semibold">Selecciona un método de pago</span>
				<UButton color="primary" size="lg" label="Pagar con tarjeta" :to="`/payment/${useRoute().params.id}/order`"/>
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
	</div>

	<PaymentModalQR v-model:is_open="modal_qr_is_open"/>
	<PaymentModalFTF v-model:is_open="modal_ftf_is_open"/>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ["order", "role"],
	roles: ["EMPLOYER"]
})
const {plans} = usePostStore()
const current_plan = ref(Number(useRoute().params.id) > 0 && plans[Number(useRoute().params.id!)])
const modal_qr_is_open = ref(false)
const modal_ftf_is_open = ref(false)

useHead({
	title: current_plan.value ? current_plan.value?.name : 'Redirigiendo...'
})
</script>