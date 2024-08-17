<template>
	<!-- TODO: Hover y active para botones en blanco -->
	<NuxtLink :to="goto">
		<div
			class="flex flex-col tablet:flex-row w-full bg-white rounded-medium p-4 justify-between gap-4"
		>
			<div class="flex flex-col gap-4">
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
					<span class="font-semibold">{{ title }}</span>
					<span class="text-wrap">{{ description }}</span>
				</div>
			</div>

			<UButton
				variant="ghost"
				icon="ri:delete-bin-2-line"
				class="h-fit hidden tablet:flex"
			>
				Eliminar
			</UButton>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	description: string;
	goto: string; // TODO: Implementar enumeración
}

defineProps<Props>();
</script>
