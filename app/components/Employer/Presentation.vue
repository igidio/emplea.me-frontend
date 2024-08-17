<template>
	<UCard>
		<div class="flex flex-col gap-4">
			<div class="flex flex-row justify-between p-4">
				<div class="flex flex-row gap-4">
					<img
						src="https://placehold.co/400"
						class="w-24 aspect-[1:1] rounded-medium"
					/>
					<div class="flex flex-col">
						<div class="flex flex-col gap-2">
							<h3>{{ name }}</h3>
							<item icon="ri:calendar-line" :label="establishment_date" />
							<item icon="ri:calendar-line" :label="email" />
						</div>
					</div>
				</div>
				<UButton icon="ri:ball-pen-fill" class="h-fit">Editar</UButton>
			</div>

			<hr />
			<p class="text-justify">{{ description }}</p>
		</div>
	</UCard>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	establishment_date: string;
	email: string;
	description: string;
}
defineProps<Props>();
</script>
