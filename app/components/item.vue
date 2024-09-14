<template>
	<div class="flex flex-row gap-2">
		<IconFill
			:name="icon"
			:small="!(label_bold !== undefined || (small && regular)) || one_line"
		/>
		<div class="flex flex-col" v-if="label">
			<span class="font-semibold" v-if="label_bold && !one_line">{{
				label_bold
			}}</span>

			<span>
				<span class="font-semibold" v-if="label_bold && one_line">{{
					label_bold
				}}</span>
				{{ label }}
			</span>
			<span class="text-sm" v-if="small && !one_line">{{ small }}</span>
			<span class="text-sm" v-if="description && !one_line">{{
				description
			}}</span>
		</div>
		<div class="flex flex-col" v-if="small && regular">
			<span class="text-sm">{{ small }}</span>
			<span>{{ regular }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	label?: string;
	label_bold?: string;
	small?: string;
	description?: string;
	regular?: string;
	icon: string;
	one_line?: boolean;
}

defineProps<Props>();
</script>
