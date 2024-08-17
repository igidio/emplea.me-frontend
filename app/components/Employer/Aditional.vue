<template>
	<UCard class="h-fit">
		<template #header>Información adicional</template>
		<div class="flex flex-col gap-2">
			<item
				icon="ri:calendar-event-line"
				small="Activo desde"
				:regular="created_at"
			/>
			<item
				icon="ri:calculator-line"
				small="Número de publicaciones"
				:regular="posts_total"
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
interface Props {
	posts_total: string;
	created_at: string;
}

defineProps<Props>();
</script>
