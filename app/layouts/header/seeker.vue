<template>
	<div class="flex flex-row gap-4 items-center">
		<NuxtLink to="/">
			<Logo />
		</NuxtLink>

		<div class="flex flex-row h-fit gap-2">
			<UButton variant="ghost">Trabajos</UButton>
			<UButton variant="ghost">Mis favoritos</UButton>
		</div>
	</div>

	<div class="flex flex-row gap-4">
		<Notifications />

		<UButton
			variant="ghost"
			class="block tablet:hidden"
			icon="ri:menu-fill"
			@click="is_open = true"
		/>

		<Dropdown />
	</div>
</template>

<script setup lang="ts">
const is_open = ref(false);
</script>
