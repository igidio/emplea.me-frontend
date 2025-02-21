<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}]"/>

		<div class="flex flex-col desktop:flex-row gap-4">
			<div class="desktop:w-[50%]">
				<LandingWelcomeMessage/>
			</div>
			<div class="desktop:w-[50%]">
				<LandingSearch/>
			</div>
		</div>
		<LandingCategories/>
		<hr/>
		<div class="flex flex-col desktop:flex-row gap-4">
			<LandingFeatured class="grow"/>
			<Add class="w-40"/>
		</div>
		<Add class="h-32"/>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Inicio'
})

</script>
