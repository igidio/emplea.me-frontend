<template>
	<!-- TODO: Hover y active para botones en blanco -->
	<div
		class="flex flex-col tablet:flex-row w-full bg-white hover:bg-white/80 transition-all rounded-medium p-4 justify-between gap-4 border"
	>
		<NuxtLink :to="goto" class="w-full">
			<div class="flex flex-col gap-4 w-full ">
				<div class="flex flex-row justify-between">
					<UBadge class="w-fit">{{ goto }}</UBadge>
					<UButton
						variant="ghost"
						icon="ri:delete-bin-2-line"
						class="h-fit tablet:hidden"
					>
					</UButton>
				</div>
				<div class="flex flex-col">
					<span class="text-wrap">{{ description }}</span>
					<span class="text-sm text-gray-500">{{ date }}</span>
				</div>
			</div>

		</NuxtLink>
		<UButton
			variant="ghost"
			icon="ri:delete-bin-2-line"
			class="h-fit hidden tablet:flex"
		>
			Eliminar
		</UButton>
	</div>

</template>

<script setup lang="ts">
import {last_time} from "~/helpers/last_time";

interface Props {
	description: string;
	goto: string;
	date: string;
}

defineProps<Props>();
</script>
