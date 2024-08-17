<template>
	<div class="flex flex-col gap-2">
		<div class="w-full background sticky top-14 z-50">
			<NuxtLink to="/">
				<UButton size="lg" color="black" class="w-full">
					<UIcon name="ri:arrow-left-circle-fill" />
					Volver a inicio
				</UButton>
			</NuxtLink>
		</div>

		<div class="grid grid-cols-1 tablet:grid-cols-4 desktop:grid-cols-6 gap-4">
			<CategoryButton :category="category" v-for="category in categories" />
		</div>
	</div>
</template>

<script setup lang="ts">
import searchOptions from "~/data/search/search-options.data";

const categories = ref(searchOptions.categories);
</script>
