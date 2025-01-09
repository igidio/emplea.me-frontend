<template>
	<div
		class="min-w-20 bg-white sticky top-0 h-screen border-r p-4 transition-all"
	>
		<AdminMenu :is_collapsed="is_collapsed" :collapse="collapse"/>
	</div>
	<div>
		<UButton label="Open" @click="is_open = true"/>

		<USlideover
			v-model="is_open"
			side="left"
			class="max-w-44"
		>
			<div
				class="min-w-44 bg-white sticky top-0 h-screen border-r p-4 transition-all"
				:class="is_collapsed && 'min-w-20'"
			>
				<AdminMenu :collapse="collapse"/>
			</div>
		</USlideover>
	</div>
</template>

<script setup lang="ts">
const is_open = ref(false)

const is_collapsed = ref(true)

const collapse = () => {
	is_open.value = !is_open.value
}
</script>
