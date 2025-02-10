<template>
	<UModal v-model="is_open">
		<UCard>
			<div>
				<slot/>
			</div>
			<template #footer>
				<div class="flex flex-row gap-2 w-full justify-end">
					<UButton
						color="black"
						@click="close_modal"
						label="Continuar"
					/>
				</div>
			</template>
		</UCard>

	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";

const {close} = defineProps<{
	close: () => void
}>()
const is_open: ModelRef<boolean> = defineModel('is_open', {required: true, type: Boolean});

const close_modal = () => close()
</script>