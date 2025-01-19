<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
	>
		<div class="flex flex-row gap-4">
			<IconFill
				:name="
					props.level
					? skill_level_icon[props.level as keyof typeof skill_level_icon]
					: 'ri:checkbox-blank-circle-line'"
			/>
			<div class="flex flex-col">
				<span class="font-semibold">{{ props.name }}</span>
				<span
					class="text-sm"
					v-if="props.level"
				>{{ `${SkillLevelEnum[props.level as keyof typeof SkillLevelEnum]}` }}</span>
			</div>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar"/>
			<UButton color="red" label="Eliminar"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import {SkillLevelEnum} from "~/enums";

interface Props {
	name: string;
	level?: string;
	icon: string;
}

defineProps<{ props: Props }>();

const skill_level_icon = {
	'BASIC': 'ri:progress-2-line',
	'INTERMEDIATE': 'ri:progress-5-line',
	'ADVANCED': 'ri:progress-8-line',
}
</script>