<template>
	<div
		class="flex flex-col bg-violet-100 grow w-full py-8 px-4 gap-4 rounded-large"
	>
		<h6>Prueba buscando tu trabajo ideal</h6>
		<UForm :state="state">
			<div class="flex flex-col gap-4">
				<!-- Searchbar -->
				<UFormGroup>
					<UInput
						v-model="state.search"
						type="text"
						size="lg"
						placeholder="Buscar trabajo"
					/>
				</UFormGroup>

				<div class="flex flex-col desktop:flex-row gap-4">
					<!-- Lugar -->
					<UFormGroup v-model="state.location" size="lg" class="grow">
						<USelect
							name="locationOptions"
							:options="locationOptions"
							size="lg"
							placeholder="Lugar"
						/>
					</UFormGroup>
					<UFormGroup
						name="categoryOptions"
						v-model="state.location"
						size="lg"
						class="grow"
					>
						<USelect
							:options="categoryOptions"
							size="lg"
							placeholder="Categoría"
						/>
					</UFormGroup>
				</div>
				<UButton type="submit" size="lg"> Buscar </UButton>
			</div>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import type { Reactive } from "vue";

const locationOptions = ["La Paz", "El Alto"];
const categoryOptions = ["Categoría 1", "Categoría 2"];

interface state {
	search: string;
	location: string;
	category: string;
}

const state: Reactive<state> = reactive({
	search: "",
	location: "",
	category: "",
});
</script>
