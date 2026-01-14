<template>
	<div
		class="bg-white h-screen border-r p-4 transition-all"
		:class="is_collapsed ? 'w-20' : 'w-44'"
	>
		<AdminMenu
			v-model:is_collapsed="is_collapsed"
			:collapse="collapse"
		/>
	</div>
</template>

<script setup lang="ts">
const is_collapsed = ref(false)
const collapse = () => {
	is_collapsed.value = !is_collapsed.value
}
</script>