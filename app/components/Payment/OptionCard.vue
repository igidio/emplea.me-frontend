<template>
	<div
		class="flex tablet:flex-row desktop:flex-col rounded-large p-4 text-center place-content-between h-full shadow shadow-black/20 desktop:min-w-44 desktop:max-w-44"
		:class="`bg-${color}`"
	>
		<div class="flex flex-col">
			<span class="font-semibold">{{ name }}</span>
			<span class="font-black text-5xl">{{ price }} Bs.</span>
			<span class="font-semibold mb-4">Beneficios</span>
			<ul class="list-disc list-inside text-left">
				<li v-for="benefit in benefits.split(';')" class="text-sm">{{ benefit }}</li>
			</ul>
		</div>

		<NuxtLink
			:to="`/payment/${id!-1}`"
			v-if="show_select_button"
		>
			<UButton
				v-if="!current"
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
const {name, price, benefits, color, id} = props.props
</script>