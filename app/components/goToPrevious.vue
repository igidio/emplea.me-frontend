<template>
	<ClientOnly>
		<RouterLink
			:to="option.prev"
			class="flex flex-row gap-2 items-center mb-2 got_to_previous w-fit"
		>
			<UButton
				icon="ri:arrow-drop-left-line"
			/>
			{{ option.message }}
		</RouterLink>
	</ClientOnly>
</template>

<script setup lang="ts">
const router = useRouter()
const option: ComputedRef<{ prev: string, message: string }> = computed(() => ({
	prev: (router.options.history.state['back']) ? router.options.history.state['back'] as string : '/',
	message: (router.options.history.state['back']) ? 'Volver a página anterior' : 'Ir a inicio'
}))
</script>