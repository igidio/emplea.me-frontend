<template>
	<div class="relative perspective text-sm">
		<div
			class="relative h-40 w-full p-6 transition-all duration-300"
			:class="[is_card_flipped ? 'rotate-y-180' : '']"
		>
			<!-- Front of card -->
			<div
				class="absolute inset-0 p-6 bg-gradient-to-br from-violet-500 to-purple-700 rounded-large"
				:class="[is_card_flipped ? 'backface-hidden' : '']"
			>
				<div class="flex flex-col h-full text-white">
					<div class="flex justify-between items-start">
						<UIcon name="ri:bank-card-2-fill" class="h-6 w-10"/>
						<span class="text-lg font-medium">Tarjeta de débito</span>
					</div>

					<div class="my-2">
						<p class="font tracking-wider text-xl text-nowrap">
							{{ formattedCardNumber || '•••• •••• •••• ••••' }}
						</p>
					</div>

					<div class="mt-auto flex justify-between items-end">
						<div class="w-32 overflow-hidden text-ellipsis">
							<p class="text-xs opacity-75 mb-1">Nombre del titular</p>
							<p class="font-medium overflow-hidden text-ellipsis text-nowrap">{{ props.card.card_holder || 'NOMBRE Y APELLIDO' }}</p>
						</div>
						<div>
							<p class="text-xs opacity-75 mb-1">Válido hasta</p>
							<p class="font-medium text-end">{{ formattedExpiry || 'MM/YY' }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Back of card -->
			<div
				class="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 rotate-y-180 rounded-large"
				:class="[!is_card_flipped ? 'backface-hidden' : '']"
			>
				<div class="h-full flex flex-col">
					<div class="h-12 bg-black/30 mt-4"></div>
					<div class="px-6 mt-4">
						<div class="flex items-center justify-end">
							<div class="bg-white/90 h-10 w-full max-w-[160px] flex items-center justify-end px-3">
								<!--										<span class="font-mono">{{ cvv || '•••' }}</span>-->
								<span class="font-mono">{{ props.card.cvv || '•••' }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Computed properties
const formattedCardNumber = computed(() => {
	// if (!cardNumber.value) return ''
	// return cardNumber.value
	if (!props.card.card_number) return ''
	return props.card.card_number
})

const formattedExpiry = computed(() => {
	// if (!expiry.value) return ''
	// return expiry.value
	if (!props.card.expiry) return ''
	return props.card.expiry
})

interface Props {
	card: {
		card_number: string,
		card_holder: string,
		expiry: string,
		cvv: string,
	},
	is_card_flipped: boolean
}
const props = defineProps<Props>()
</script>


<style scoped>
.perspective {
	perspective: 1000px;
}

.rotate-y-180 {
	transform: rotateY(180deg);
}

.backface-hidden {
	backface-visibility: hidden;
}
</style>