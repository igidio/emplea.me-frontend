<template>
	<UCard>
		<div class="flex flex-col gap-4">
			<div class="flex flex-row justify-between p-4">
				<div class="flex flex-row gap-4">
					<img
						:src="selected?.employer.profile_image ? selected?.employer.profile_image : 'https://placehold.co/400'"
						class="w-24 aspect-[1:1] rounded-medium"
						alt="Logo de empresa"
					/>
					<div class="flex flex-col">
						<div class="flex flex-col gap-2">
							<h3>{{ selected?.employer.name }}</h3>
							<item icon="ri:calendar-line" :label="selected?.employer.establishment_date!" />
							<item icon="ri:calendar-line" :label="selected?.employer.email" />
						</div>
					</div>
				</div>
				<UButton icon="ri:ball-pen-fill" class="h-fit">Editar</UButton>
			</div>

			<hr />
			<p class="text-justify">{{ selected?.employer.description }}</p>
		</div>
	</UCard>
</template>

<script setup lang="ts">
const { selected } = useMyEmployments();
</script>
