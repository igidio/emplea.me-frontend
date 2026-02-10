<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb
			:links="[
				{
					label: 'Inicio',
					icon: 'i-heroicons-home',
					to: '/',
				},
				{
					label: result?.employer.name!,
					to: `/employer/${result.employer.id}`,
				},
			]"
		/>

		<EmployerPage :data="result" v-if="result" />
	</div>
</template>

<script setup lang="ts">
import type { EmployerInterface, EmployerUserInterface } from "~/interfaces";

definePageMeta({
	middleware: ["employer"],
	keepalive: false,
	require_employer_user: false,
});

const route = useRoute();
const result = ref(
	route.meta.employer_data as {
		employer: EmployerInterface;
		employerUser: EmployerUserInterface;
	},
);
const refetch = route.meta.refetch as () => Promise<{
	data: {
		findOneEmployer: {
			employer: EmployerInterface;
			employerUser: EmployerUserInterface;
		};
	};
}>;

useHead({
	title: result.value.employer.name,
});

onMounted(async () => {
	await refetch();
});
</script>
