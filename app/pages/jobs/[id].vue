<template>
	<div class="flex flex-col">
		<div class="flex flex-row">Volver</div>
		<div class="flex flex-col desktop:flex-row gap-3 w-full">
			<div
				class="flex flex-col bg-white w-full desktop:w-[75%] rounded-medium gap-2 p-8"
			>
				<span class="inline-flex gap-2">
					<UIcon
						v-if="job.category?.icon"
						:name="job.category.icon.toString()"
					/>
					{{ job.category?.name }}
				</span>
				<h2>{{ job.title }}</h2>
				<div class="flex flex-col gap-2 desktop:flex-row">
					<div class="flex flex-col desktop:w-[30%] gap-2">
						<item
							:label="job.location"
							label-bold="Lugar"
							icon="ri:map-pin-2-line"
						/>
						<item
							:label="job.modality"
							label-bold="Modalidad"
							icon="ri:time-line"
						/>
						<item
							label-bold="Salario"
							:label="`${job.salary} - ${job.salary_type}`"
							icon="ri:copper-coin-line"
						/>
					</div>
					<hr class="desktop:hidden" />
					<div class="flex flex-col desktop:w-[70%] gap-2">
						<item :label="date" icon="ri:calendar-line" />
						<p class="text-justify">{{ job.description }}</p>
						<hr class="desktop:hidden" />
						<h6>Habilidades necesarias</h6>
						<div class="grid tablet:grid-cols-2 gap-3">
							<item
								:icon="skillLevelIcon[skill.level]"
								v-for="skill in job.skills"
								:label="skill.level"
								:label-bold="skill.name"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col desktop:w-[25%] gap-4">
				<EmployerInfo
					:profile_image="employer.profile_image"
					:name="employer.name"
					:id="employer.id"
				/>

				<UCard>
					<template #header><h6>Información de la empresa</h6></template>

					<div class="flex flex-col relative overflow-hidden gap-2">
						<UButton
							class="z-[2] absolute center-absolute"
							@click="is_hidden = false"
							v-if="is_hidden"
						>
							Me interesa
						</UButton>

						<!-- <div
							class="absolute z-[2] rounded-medium p-2 bg-white text-center center-absolute shadow-md"
						>
							Para ver la información debes
							<NuxtLink to="login" class="hyper">Iniciar sesión</NuxtLink>
						</div> -->

						<div
							class="absolute z-[1] backdrop-blur-sm h-full w-full bg-white/30"
							v-if="is_hidden"
						/>

						<div class="flex flex-col desktop:flex-col tablet:flex-row">
							<div class="flex flex-col grow">
								<span class="font-semibold mb-2">Contacto telefónico</span>
								<div class="flex flex-col gap-2">
									<itemLink
										:icon="phone.icon"
										:label="phone.label.toString()"
										:link="phone.link"
										v-for="phone in phones"
									/>
								</div>
							</div>
							<div class="flex flex-col grow">
								<span class="font-semibold mb-2">Redes sociales</span>
								<div class="flex flex-col gap-2" v-if="social_media.length > 0">
									<itemLink
										:icon="social.icon"
										:label="social.label"
										:link="social.link"
										v-for="social in social_media"
									/>
								</div>
							</div>
						</div>
					</div>
				</UCard>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import searchOptions from "~/data/search/search-options.data";
import socialMediaData from "~/data/social_media.data";

const is_hidden = ref(true);
const unauthenticated = ref(true);

enum salaryTypeEnum {
	MONTHLY = "Mensual",
	DAILY = "Diario",
	YEARLY = "Anual",
}

enum skillLevelEnum {
	BASIC = "Básico",
	INTERMEDIATE = "Intermedio",
	ADVANCED = "Avanzado",
}

const employer = reactive({
	name: "employer-name",
	id: 1,
	profile_image: "https://placehold.co/400",
	website: "employer-website",
	phone: [
		{ number: 76543210, has_whatsapp: true },
		{
			number: 76543211,
			has_whatsapp: false,
		},
		{
			number: 76543212,
			has_whatsapp: true,
		},
		{ number: 76543213, has_whatsapp: false },
	],
	social_media: [
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 1,
		},
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 2,
		},
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 3,
		},
		{
			profile_name: "user1",
			is_verified: true,
			social_media: 4,
		},
	],
});

const job = reactive({
	title: "job-title",
	category: searchOptions.categories[0],
	location: "Department - province",
	modality: "Tiempo completo",
	modified_at: new Date(),
	salary: 3000.0,
	salary_type: salaryTypeEnum.MONTHLY,
	description: `job-description  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nulla a elit sollicitudin aliquet vitae varius mi. Aliquam magna mi, volutpat sit amet facilisis a, varius in ante. Integer eu elementum neque. Vestibulum eget leo pharetra, finibus orci nec, sodales augue. Duis vehicula maximus lorem, sed semper tellus semper vitae. Duis ac velit et purus faucibus blandit. Sed laoreet magna velit, et convallis augue posuere eget. In hac habitasse platea dictumst. Nam urna neque, efficitur eu tincidunt ut, tincidunt quis velit. Mauris ornare dapibus lorem vitae consequat. Phasellus rhoncus odio ac consectetur hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque volutpat ipsum sem, quis tempor nunc ultricies vel. Nullam vitae placerat tortor, quis mollis leo.`,
	skills: [
		{
			name: "skill-1",
			level: skillLevelEnum.ADVANCED,
		},
		{
			name: "skill-2",
			level: skillLevelEnum.INTERMEDIATE,
		},
		{
			name: "skill-3",
			level: skillLevelEnum.BASIC,
		},
	],
});

const date = computed(() => job.modified_at.toString());

const phones = computed(() =>
	employer.phone.map((e: any) => {
		let object: any = {
			label: e.number,
			icon: e.has_whatsapp ? "ri:whatsapp-line" : "ri:phone-line",
		};

		if (e.has_whatsapp) object.link = `https://wa.me/591${e.profile_name}`;
		return object;
	})
);

const social_media = computed(() =>
	employer.social_media.map((e: any) => ({
		label: socialMediaData[e.social_media]!.type,
		icon: socialMediaData[e.social_media]!.icon,
		link: `${socialMediaData[e.social_media]!.prefixUrl}${e.profile_name}`,
	}))
);

const skillLevelIcon = {
	[skillLevelEnum.BASIC]: "ri:progress-3-line",
	[skillLevelEnum.INTERMEDIATE]: "ri:progress-4-line",
	[skillLevelEnum.ADVANCED]: "ri:progress-8-line",
};
</script>
