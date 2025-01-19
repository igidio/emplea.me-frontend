<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
	>
		<div class="flex flex-row gap-4">
			<item
				icon="ri:briefcase-4-fill"
				:label="props.company"
				:label_bold="props.title"
				:small="`
							${props.start_date && new Date(props.start_date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
							${(props.start_date && props.end_date) && ' - '}
							${props.end_date && new Date(props.end_date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`"
				:description="props.description"
			/>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar"/>
			<UButton color="red" label="Eliminar"/>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	company: string;
	title: string;
	start_date?: Date;
	end_date?: Date;
	description: string;
}
defineProps<{ props: Props }>();

//const {} = useAsyncQuery()
</script>