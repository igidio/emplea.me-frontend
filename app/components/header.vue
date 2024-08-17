<template>
	<header
		id="auth-buttons"
		class="flex flex-row justify-between items-center h-16 p-4 my-4 sticky top-0 bg-violet-50 z-50"
	>
		<NuxtLink to="/">
			<UButton variant="ghost"> <Logo /></UButton>
		</NuxtLink>
		<UButton variant="ghost" class="block tablet:hidden">
			<IconFill
				name="ri:menu-fill"
				style="color: black"
				@click="isOpen = true"
			/>
		</UButton>

		<div class="h-min gap-6 hidden tablet:flex flex-row">
			<AuthButtons />
		</div>
	</header>

	<USlideover v-model="isOpen">
		<Sidebar v-model="isOpen" />
	</USlideover>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>
