<template>
	<UModal v-model="isOpen">
		<div class="p-4">HOlaaa</div>

		dasdsadad
	</UModal>
</template>

<script setup lang="ts">
import type { ModelRef } from "vue";

const isOpen: ModelRef<boolean> = defineModel({
	required: true,
});
</script>
