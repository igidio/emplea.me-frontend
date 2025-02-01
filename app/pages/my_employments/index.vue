<template>
	<div class="flex flex-col gap-4 center ">
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
			v-if="data !== undefined && !loading"
			:data="data"
		/>
	</div>

</template>

<script setup lang="ts">
import {employerFindOne, employerGetByUser} from "~/queries";
import {useMyEmployments} from "~/composables/my_employments.composable";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER']
})

const loading = ref(false)

const {fill_employments, user_id, employments, selected, index} = useMyEmployments();
const result = ref<{
	employer: EmployerInterface,
	employerUser: EmployerUserInterface
} | undefined>(undefined)

const {data: employerGetByUserData, error} = await useAsyncQuery<{
	EmployerlistByUser: EmployerUserInterface[]
}>(employerGetByUser, {"id": Number(user_id)});
await fill_employments({data: employerGetByUserData, error})

const {result: EmploymentData, load, refetch} = useLazyQuery<{
	findOneEmployer: {
		employer: EmployerInterface,
		employerUser: EmployerUserInterface
	}
}>(employerFindOne, {"findOneEmployerId": 1})
load()


const get_employer = async (i: number) => {
	loading.value = true
	data.value = undefined
	const employer_user = employerGetByUserData.value?.EmployerlistByUser[i];
	await refetch({"findOneEmployerId": Number(employer_user?.employer.id)})
	data.value = EmploymentData.value?.findOneEmployer
	loading.value = false
}
</script>
