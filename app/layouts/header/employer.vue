<template>
	<div class="flex flex-row gap-4 items-center">
		<NuxtLink to="/">
			<Logo />
		</NuxtLink>

		<div class="flex flex-row h-fit gap-2">
			<UButton variant="ghost">Mis negocios</UButton>
			<UButton variant="ghost">Mis publicaciones</UButton>
			<UButton variant="ghost" v-if="is_premium">⭐ Mis servicios</UButton>
			<UButton color="gold" v-if="!is_premium">Sé un premium</UButton>
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

const is_premium = ref(true);
</script>
