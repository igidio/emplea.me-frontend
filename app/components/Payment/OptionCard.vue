<template>
	<div
		class="flex tablet:flex-row desktop:flex-col rounded-large p-4 text-center place-content-between h-full shadow shadow-black/20"

		:class="color"
	>
		<div class="flex flex-col">
			<span class="font-semibold">{{ name }}</span>
			<span class="font-black text-5xl">{{ price }} {{ currency }}</span>
			<span class="font-semibold mb-4">Beneficios</span>
			<ul>
				<li v-for="benefit in benefits" class="text-sm">{{ benefit }}</li>
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

interface Props {
	props: PlanInterface,
	current?: boolean,
	index?: number,
	show_select_button?: boolean
}

const props = withDefaults(
	defineProps<Props>(),
	{ show_select_button: true }
)
const {name, price, currency, benefits, color} = props.props
</script>