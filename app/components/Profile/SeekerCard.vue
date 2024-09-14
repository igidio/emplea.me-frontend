<template>
	<UCard>
		<template #header>Perfil de aplicante de trabajo</template>

		<div class="flex flex-row w-full">
			<div class="flex flex-col w-full gap-4">
				<item
					icon="ri:map-pin-2-fill"
					:label="current_place_computed"
					label_bold="Lugar actual"
				/>

				<h6>Educación</h6>
				<item
					icon="ri:school-fill"
					:label="item.title"
					:small="`${item.starting_year} - ${item.completion_year}`"
					:label_bold="item.institution"
					v-for="item in education"
				/>
				<h6>Experiencia laboral</h6>
				<div class="flex flex-col gap-2" v-for="item in experience">
					<item
						icon="ri:briefcase-4-fill"
						:label="item.company_name"
						:label_bold="item.job_title"
						:small="`${item.start_date} - ${item.end_date}`"
						:description="item.job_description"
					/>
				</div>
			</div>

			<div class="flex flex-col w-full gap-4">
				<h4>Habilidades</h4>
				<item
					icon="ri:tools-fill"
					:label="item.level"
					:label_bold="item.name"
					v-for="item in skills"
				/>
				<h6>Redes sociales</h6>
				<NuxtLink v-for="item in social" :to="item.link">
					<item icon="ri:tiktok-fill" :label="item.name" one_line />
				</NuxtLink>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
const current_place_computed = computed(() => {
	return `La Paz - Bolivia`;
});

const education = [
	{
		title: "Ingeniería de Sistemas",
		institution: "Universidad Mayor de San Andrés",
		deegree: "Licenciatura",
		starting_year: 2018,
		completion_year: 2022,
	},
	{
		title: "Ingeniería de Sistemas",
		institution: "Universidad Mayor de San Andrés",
		deegree: "Licenciatura",
		starting_year: 2018,
		completion_year: 2022,
	},
	{
		title: "Ingeniería de Sistemas",
		institution: "Universidad Mayor de San Andrés",
		deegree: "Licenciatura",
		starting_year: 2018,
		completion_year: 2022,
	},
];

const experience = [
	{
		start_date: 2020,
		end_date: 2021,
		job_title: "Desarrollador de software",
		company_name: "Empresa de desarrollo",
		job_description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
	},
	{
		start_date: 2020,
		end_date: 2021,
		job_title: "Desarrollador de software",
		company_name: "Empresa de desarrollo",
		job_description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
	},
	{
		start_date: 2020,
		end_date: 2021,
		job_title: "Desarrollador de software",
		company_name: "Empresa de desarrollo",
		job_description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
	},
	{
		start_date: 2020,
		end_date: 2021,
		job_title: "Desarrollador de software",
		company_name: "Empresa de desarrollo",
		job_description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
	},
	{
		start_date: 2020,
		end_date: 2021,
		job_title: "Desarrollador de software",
		company_name: "Empresa de desarrollo",
		job_description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
	},
	{
		start_date: 2020,
		end_date: 2021,
		job_title: "Desarrollador de software",
		company_name: "Empresa de desarrollo",
		job_description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
	},
];

const skills = [
	{
		name: "JavaScript",
		level: "Avanzado",
	},
	{
		name: "JavaScript",
		level: "Avanzado",
	},
	{
		name: "JavaScript",
		level: "Avanzado",
	},
	{
		name: "JavaScript",
		level: "Avanzado",
	},
	{
		name: "JavaScript",
		level: "Avanzado",
	},
	{
		name: "JavaScript",
		level: "Avanzado",
	},
];
const social = [
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/in/username",
	},
	{
		name: "GitHub",
		link: "https://www.github.com/username",
	},
	{
		name: "Twitter",
		link: "https://www.twitter.com/username",
	},
];
</script>
