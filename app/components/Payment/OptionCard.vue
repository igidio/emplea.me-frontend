<template>
	<div class="flex flex-col rounded-large p-4 text-center place-content-between" :class="color">
		<div class="flex flex-col">
		<span class="font-semibold">{{ name }}</span>
		<span class="font-black text-5xl">{{ price }} {{ currency }}</span>
		<span class="font-semibold mb-4">Beneficios</span>
		<ul>
			<li v-for="benefit in benefits">{{ benefit }}</li>
		</ul>
		</div>
		
		<UButton
			color="black"
			class="w-fit self-center"
			:label="current ? 'Activo' : 'Seleccionar'"
			:disabled="current"
		/>
		
	</div>
	
	
</template>

<script setup lang="ts">
import type {PlanInterface} from "~/interfaces";

const props = defineProps<{ props: PlanInterface, current: boolean }>()
const { name, price, currency, benefits, color } = props.props
</script>