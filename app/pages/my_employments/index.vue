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
			<EmployerCardButtonAdd/>
		</div>

		<div
			class="h-[calc(100vh-330px)] w-full flex items-center justify-center"
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
import {employerGetByUser} from "~/queries";
import {useMyEmployments} from "~/composables/my_employments.composable";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
const loading = ref(false)

const { fill_employments, user_id, employments, selected, index } = useMyEmployments();
const data = ref<EmployerInterface|undefined>(undefined)

const {data: employerGetByUserData, error} = await useAsyncQuery<{ EmployerlistByUser: EmployerUserInterface[]}>(employerGetByUser, {"id": Number(user_id)});
await fill_employments({data: employerGetByUserData, error})
console.log(employerGetByUserData.value)

const query = gql`
query Employer($employerId: Int!) {
  employer(id: $employerId) {
    id
    name
    modified_at
    location {
      id
    }
    is_active
    establishment_date
    email
    description
    post {
      available
      name
      location {
        municipality
        province
        department
      }
      is_active
      is_featured
      id
      description
    }
    profile_image
    created_at
    is_verified
  }
}
`

const { result: EmploymentData, load, refetch } = useLazyQuery<{ employer: EmployerInterface }>(query, {"employerId": 1})
load()


const get_employer = async (i: number) => {
	loading.value = true
	data.value = undefined
	const employer_user = employerGetByUserData.value?.EmployerlistByUser[i];
	await refetch({"employerId": Number(employer_user?.employer.id)})
	data.value = EmploymentData.value?.employer
	loading.value = false
}
</script>
