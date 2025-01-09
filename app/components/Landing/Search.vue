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
						v-model="state.searchQuery"
						type="text"
						size="lg"
						placeholder="Buscar trabajo"
					/>
				</UFormGroup>

				<div class="flex flex-col tablet:flex-row gap-4">
					<!-- Lugar -->
					<USelectMenu
						clear-search-on-close
						placeholder="Seleccione"
						searchable
						searchable-placeholder="Buscar"
						v-model="state.location"
						:options="searchOptions.locations"
						option-attribute="name"
						size="lg"
						class="grow"
					/>

					<USelectMenu
						clear-search-on-close
						placeholder="Seleccione"
						searchable
						searchable-placeholder="Buscar"
						v-model="state.category"
						:options="searchOptions.categories"
						option-attribute="name"
						size="lg"
						class="grow"
					>
					</USelectMenu>
				</div>
				<h6>Modalidad</h6>
				<div
					class="flex flex-col flex-wrap tablet:flex-row gap-2 desktop:gap-4"
				>
					<UCheckbox
						v-for="modality in state.modalities"
						:label="modality.name"
						v-model="modality.active"
					/>
				</div>

				<UButton type="submit" size="lg" @click="sendSearchQuery()">
					Buscar
				</UButton>
			</div>
		</UForm>
	</div>
</template>

<script setup lang="ts">
const { searchOptions, state, sendSearchQuery } = useSearch();
</script>
