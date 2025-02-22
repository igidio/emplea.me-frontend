<template>
	<UModal v-model="is_open">
		<UCard>
			<template #header>Invitaciones por correo</template>
			<div class="flex flex-col gap-4">

			</div>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";

const is_open: ModelRef<boolean> = defineModel('is_open', {required: true, type: Boolean});


</script>