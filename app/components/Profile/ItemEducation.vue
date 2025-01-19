<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
	>
		<div class="flex flex-row gap-4">
			<IconFill
				name="ri:school-fill"
			/>
			<div class="flex flex-col">
				<span class="font-semibold">{{ props.institute }}</span>
				<span>{{ DegreeEnum[props.degree as keyof typeof DegreeEnum] }}</span>
				<span  class="text-sm">
					{{ props.starting_year && props.starting_year }}
					{{ (props.starting_year && props.completion_year) && ' - ' }}
					{{ props.completion_year && props.completion_year }}
				</span>
			</div>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar"/>
			<UButton color="red" label="Eliminar"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import {DegreeEnum} from "~/enums";

interface Props {
	institute: string;
	degree: string;
	starting_year?: number;
	completion_year?: number;
}

defineProps<{ props: Props }>();
</script>