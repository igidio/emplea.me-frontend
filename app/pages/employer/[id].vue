<template>
	<div class="flex flex-col">
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-4 w-[80%]">
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
										<h3>{{ employer.name }}</h3>
										<item
											icon="ri:calendar-line"
											:label="employer.establishment_date.toString()"
										/>
										<item icon="ri:calendar-line" :label="employer.email" />
									</div>
								</div>
							</div>
							<UButton icon="ri:ball-pen-fill" class="h-fit">Editar</UButton>
						</div>

						<hr />
						<p class="text-justify">{{ employer.description }}</p>
					</div>
				</UCard>

				<UCard>
					<template #header>Publicaciones</template>
					<div class="flex flex-col gap-4">
						<UButton icon="ri:add-circle-line" size="lg">Agregar</UButton>
						<JobListElement />
						<JobListElement />
						<JobListElement />
						<JobListElement />
						<Add class="h-32" />
						<JobListElement />
						<JobListElement />
						<JobListElement />
					</div>
				</UCard>
			</div>

			<div class="w-[20%] flex flex-col gap-4">
				<UCard class="h-fit">
					<template #header>Información adicional</template>
					<div class="flex flex-col gap-2">
						<item
							icon="ri:calendar-event-line"
							small="Activo desde"
							:regular="employer.created_at.toString()"
						/>
						<item
							icon="ri:calculator-line"
							small="Número de publicaciones"
							:regular="posts_total.toString()"
						/>
					</div>
				</UCard>
				<Add class="h-64" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const employer = reactive({
	name: "employer-name",
	establishment_date: new Date("2014-04-04"),
	created_at: new Date("2024-04-04"),
	id: 1,
	profile_image: "https://placehold.co/400",
	email: "email@mail.com",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel turpis ac velit fermentum placerat. Donec vulputate, tortor id ultricies fermentum, enim est ullamcorper velit, vel pulvinar felis arcu non sapien. Sed vel turpis ac velit fermentum placerat. Donec vulputate, tortor id ultricies fermentum, enim est ullamcorper velit, vel pulvinar felis arcu non sapien.",
});

const posts_total = ref(10);
</script>
