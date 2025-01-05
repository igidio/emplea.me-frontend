<template>
	<UCard class="h-fit flex flex-col gap-2">
		<span class="font-bold text-md mb-4 inline-block">Información adicional</span>
		<div class="flex flex-col gap-2">
			<item
				icon="ri:calendar-event-line"
				small="Activo desde"
				:regular="created_at.toString()"
			/>
			<item
				icon="ri:calculator-line"
				small="Número de publicaciones"
				:regular="total.toString()"
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
interface Props {
	total: number;
	created_at: Date | string;
}

defineProps<Props>();
</script>
