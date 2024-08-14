<template>
	<div
		class="flex flex-col tablet:hidden w-full sticky top-16 bg-violet-50 p-4 gap-4"
	>
		<h5>Trabajos: Categoria en Provincia - Departamento</h5>
		<UButton
			color="black"
			label="Opciones de búsqueda"
			@click="isOpen = true"
		/>
	</div>

	<div class="flex flex-col tablet:flex-row gap-4">
		<div class="flex flex-col w-[100%] tablet:w-[75%] gap-4">
			<h3 class="hidden tablet:block">
				Trabajos: Categoria en Provincia - Departamento
			</h3>
			<UCard>
				<template #header> 100 resultados </template>
				<div class="flex flex-col gap-4">
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<Add class="h-32" />
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<Add class="h-32" />
					<JobListElement />
					<JobListElement />
					<JobListElement />
					<JobListElement />
				</div>
			</UCard>
		</div>

		<div
			class="hidden tablet:flex flex-col grow gap-4 sticky top-16 h-[80svh] overflow-x-auto p-1"
		>
			<JobSearchOptions
				add
				:search-options="searchOptions"
				v-model="searchModel"
			/>
		</div>
	</div>

	<UModal v-model="isOpen">
		<div class="p-4 rounded-medium flex flex-col gap-4">
			<JobSearchOptions
				fullscreen
				!add
				:search-options="searchOptions"
				v-model="searchModel"
			/>
			<UButton size="lg" label="Close" @click="isOpen = false" color="black" />
		</div>
	</UModal>

	{{ searchModel }}
</template>

<script setup lang="ts">
import type { Reactive } from "vue";

const isOpen = ref(false);

interface searchOptions {
	//modalities: { id: number; name: string }[];
	categories: { id: number; name: string }[];
	departments: { id: number; name: string }[];
	provinces: { id: number; name: string }[];
}

const searchOptions: Reactive<searchOptions> = reactive({
	categories: [
		{
			id: 1,
			name: "Categoría 1",
		},
		{
			id: 2,
			name: "Categoría 2",
		},
		{
			id: 1,
			name: "Categoría 3",
		},
	],
	departments: [
		{
			id: 1,
			name: "Departamento 1",
		},
		{
			id: 3,
			name: "Departamento 3",
		},
		{
			id: 2,
			name: "Departamento 2",
		},
	],
	provinces: [
		{
			id: 1,
			name: "Provincia 1",
		},
		{
			id: 3,
			name: "Provincia 3",
		},
		{
			id: 2,
			name: "Provincia 2",
		},
	],
});

const searchModel = reactive({
	modalities: [
		{
			id: 1,
			name: "Modalidad 1",
			active: false,
		},
		{
			id: 2,
			name: "Modalidad 2",
			active: false,
		},

		{
			id: 3,
			name: "Modalidad 3",
			active: true,
		},
		{
			id: 4,
			name: "Modalidad 4",
			active: false,
		},
	],
	category: "",
	department: "",
	province: "",
});
</script>
