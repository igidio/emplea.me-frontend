<template>
	<!-- TODO: Hover y active para botones en blanco -->
	<div
		class="flex flex-col tablet:flex-row w-full bg-white hover:bg-white/80 transition-all rounded-medium p-4 justify-between gap-4 border"
	>
		<NuxtLink :to="goto || undefined" class="w-full">
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
					<span class="text-wrap">{{ message }}</span>
					<span class="text-sm text-gray-500">{{ date }}</span>
				</div>
			</div>

		</NuxtLink>
		<UButton
			variant="ghost"
			icon="ri:delete-bin-2-line"
			class="h-fit hidden tablet:flex"
			label="Eliminar"
			@click="clear"
		/>
	</div>

</template>

<script setup lang="ts">
import {last_time} from "~/helpers/last_time";

interface Props {
	title: string;
	message: string;
	goto?: string;
	date: string;
	clear: () => Promise<void>;
}

defineProps<Props>();
</script>
