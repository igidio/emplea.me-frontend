<template>
	<UModal v-model="is_open">
		<UCard>
			<template #header>
				Pago presencial
			</template>

			<div class="flex flex-col tablet:flex-col gap-8">
				<p>Apersónate en una de las sucursales de Empleame que tenemos en el país, puedes conocer
					cual es la más cercana a tí por acá.</p>

				<div class="w-full text-end ">
					<UButton class="self-end" color="black" label="Cerrar" @click="is_open = false"/>
				</div>

			</div>

		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";

const is_open: ModelRef<boolean> = defineModel('is_open', {default: false})
</script>