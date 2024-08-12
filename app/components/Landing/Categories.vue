<template>
	<div class="flex flex-col gap-4">
		<h5>Explora las categorías más populares</h5>
		<!-- category button -->
		<div class="flex flex-col">
			<div
				class="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-6 gap-4"
				:class="
					isShowMoreCategories
						? 'overflow-hidden h-48 tablet:overflow-visible tablet:h-full'
						: 'h-48 tablet:h-32 overflow-hidden'
				"
			>
				<CategoryButton v-for="element in 20" />
			</div>
		</div>

		<UButton
			size="lg"
			color="black"
			@click="isShowMoreCategories = !isShowMoreCategories"
			class="self-center hidden tablet:block"
		>
			{{
				isShowMoreCategories
					? "Mostrar menos categorías"
					: "Mostrar todas las categorías"
			}}
		</UButton>
		<NuxtLink to="categories" class="self-center tablet:hidden">
			<UButton size="lg" color="black" label="Mostrar todas las categorías" />
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
const isShowMoreCategories: Ref<boolean> = ref(false);
</script>
