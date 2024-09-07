<template>
	<NuxtLink to="/">
		<UButton variant="ghost"> <Logo /></UButton>
	</NuxtLink>
	<UButton
		variant="ghost"
		class="block tablet:hidden"
		icon="ri:menu-fill"
		@click="isOpen = true"
	/>

	<div class="h-min gap-6 hidden tablet:flex flex-row">
		<AuthButtons />
	</div>
</template>

<script></script>
