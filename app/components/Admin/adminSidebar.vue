<template>
	<div
		class="min-w-44 bg-white sticky top-0 h-screen border-r p-4 transition-all"
		:class="is_collapsed && 'min-w-20'"
	>
		<AdminMenu
			v-model:is_collapsed="is_collapsed"
			v-model:collapse="collapse"
		/>
	</div>
</template>

<script setup lang="ts">
const is_collapsed = ref(false)
const collapse = () => {
	is_collapsed.value = !is_collapsed.value
}
</script>