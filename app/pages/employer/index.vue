<template>
	<div class="flex flex-col gap-4 center ">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Mis empleos',
      to: `/employer`
		}]"/>

		<div class="flex flex-row gap-4 h-36 overflow-y-hidden">
			<EmployerCardButton
				v-for="(employment, i) in employments"
				@click="get_employer(i)"
				:name="employment.name"
				:role="employment.role"
				:image="employment.image"
			/>
			<EmployerCardButtonAdd v-if="employments.length < 4"/>
		</div>

		<div
			class="full-content w-full flex items-center justify-center"
			v-if="loading"
		>
			<UIcon
				name="ri:loader-3-fill"
				size="30"
				class="animate-spin"
			/>
		</div>

		<EmployerPage
			v-if="result !== undefined && !loading"
			:data="result"
		/>
	</div>

</template>

<script setup lang="ts">
import {employerFindOne, employerGetByUser} from "~/queries";
import {useMyEmployments} from "~/composables/my_employments.composable";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";

definePageMeta({
	middleware: ['role'],
	roles: ['EMPLOYER'],
	keepalive: false
})

useHead({
	title: 'Mis empleos'
})

const user = useUserStore()
const loading = ref(false)

const {fill_employments, employments} = useMyEmployments();

const result = ref<{
	employer: EmployerInterface,
	employerUser: EmployerUserInterface
} | undefined>(undefined)

const {data: employerGetByUserData, error} = await useAsyncQuery<{
	"employerListByUser": EmployerUserInterface[]
}>(employerGetByUser);

await fill_employments({
	data: employerGetByUserData.value?.employerListByUser,
	error
})

const {result: EmploymentData, load, refetch} = useLazyQuery<{
	findOneEmployer: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}>(employerFindOne(user.user_role as any !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": 1})
load()

const get_employer = async (i: number) => {
	await useRouter().push({query: {e: i}})
	loading.value = true
	result.value = undefined
	const employer_user = employerGetByUserData.value?.employerListByUser[i];
	await refetch({"findOneEmployerId": Number(employer_user?.employer.id)})
	result.value = EmploymentData.value?.findOneEmployer
	loading.value = false
}

onMounted(async () => {
	if (useRoute().query.e && employerGetByUserData.value?.employerListByUser[Number(useRoute().query.e)]) {
		await get_employer(Number(useRoute().query.e))
		console.log(EmploymentData.value)
	}
})
</script>
