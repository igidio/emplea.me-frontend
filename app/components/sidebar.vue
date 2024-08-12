<template>
	<div class="p-6 flex flex-col h-full">
		<UButton
			color="black"
			variant="ghost"
			icon="ri:close-fill"
			class="flex justify-end"
			square
			padded
			@click="isOpen = !isOpen"
		/>
		<div class="h-full flex">
			<slot />
			<div class="w-full self-center flex flex-col gap-4">
				<AuthButtons />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const isOpen = defineModel();
</script>
