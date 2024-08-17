<template>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col desktop:flex-row gap-4">
			<div class="desktop:w-[50%]">
				<LandingWelcomeMessage />
			</div>
			<div class="desktop:w-[50%]">
				<LandingSearch />
			</div>
		</div>
		<LandingCategories />
		<hr />
		<div class="flex flex-col tablet:flex-row gap-4">
			<LandingFeatured class="basis-[75%]" />
			<Add class="basis-[25%]" />
		</div>
		<Add class="h-32" />
	</div>
</template>

<script setup lang="ts"></script>
