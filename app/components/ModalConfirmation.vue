<template>
	<UModal v-model="is_open">
		<UCard>
			<template #header v-if="props.header">
				{{ props.header }}
			</template>
			<div class="flex flex-col">
				{{ props.body }}
			</div>
			<template #footer>
				<div class="flex flex-row gap-2 justify-end">
					<UButton @click="is_open = false" color="black">Cancelar</UButton>
					<UButton @click="props.submit()" :loading="props.loading">Aceptar</UButton>
				</div>
			</template>
		</UCard>

	</UModal>
</template>

<script setup lang="ts">
const is_open = defineModel<boolean>("is_open", {
	type: Boolean,
	required: false,
	default: false,
});

defineProps<{
	props: {
		loading: boolean
		submit: () => Promise<void>
		header?: string,
		body: string,
	}
}>()
</script>