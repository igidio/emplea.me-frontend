<template>
	<UModal v-model="is_open">
		<UCard class="text-center">
			<div class="flex flex-col gap-4 text-center">
				<p>Adquiere una suscripción premium y disfruta de esta y otras características.</p>
				<NuxtLink to="/payment" @click="is_open = false">
					<UButton
						class="w-[60%] self-center"
						color="gold"
						label="Quiero ser premium"
						/>
				</NuxtLink>
			</div>
		</UCard>
	</UModal>


</template>

<script setup lang="ts">
const is_open = defineModel<boolean>("is_open", {
	type: Boolean,
	required: false,
	default: false,
});
</script>