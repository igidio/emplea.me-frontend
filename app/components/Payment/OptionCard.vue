<template>
	<div class="flex flex-col rounded-large p-4 text-center place-content-between h-full" :class="color">
		<div class="flex flex-col">
			<span class="font-semibold">{{ name }}</span>
			<span class="font-black text-5xl">{{ price }} {{ currency }}</span>
			<span class="font-semibold mb-4">Beneficios</span>
			<ul>
				<li v-for="benefit in benefits">{{ benefit }}</li>
			</ul>
		</div>
		
		<NuxtLink
			:to="{ path: `payment/${props.index.toString()}` }"
			v-if="show_select_button"
		>
			<UButton
				color="black"
				class="w-fit self-center"
				:label="current ? 'Activo' : 'Seleccionar'"
				:disabled="current"
			/>
		</NuxtLink>
	</div>


</template>

<script setup lang="ts">
import type {PlanInterface} from "~/interfaces";

const props = withDefaults(
	defineProps<{ props: PlanInterface, current?: boolean, index: number, show_select_button: true }>(),
	{
		show_select_button: true
	}
)
const {name, price, currency, benefits, color} = props.props
</script>