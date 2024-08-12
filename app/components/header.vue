<template>
	<div
		id="auth-buttons"
		class="flex flex-row justify-between items-center h-12 p-4 my-4 sticky top-0 bg-violet-50 z-50"
	>
		<UButton variant="ghost"> <Logo /></UButton>

		<UButton
			variant="ghost"
			icon="ri:menu-fill"
			class="block tablet:hidden"
			@click="isOpen = !isOpen"
		/>

		<div class="h-min gap-6 hidden tablet:flex flex-row">
			<UButton variant="ghost">Volver a página principal</UButton>
			<UButton>¡Regístrate!</UButton>
		</div>
	</div>

	<USlideover v-model="isOpen">
		<Sidebar v-model="isOpen" />
	</USlideover>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>
