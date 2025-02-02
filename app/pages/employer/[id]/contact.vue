<template>
	<GoToPrevious/>
	<UCard>
		<template #header>Editar contacto de empleador</template>
		<div class="grid grid-cols-1 desktop:grid-cols-2 gap-4">
			<div class="flex flex-col gap-4">

				<h6>Teléfono/s</h6>
				<EmployerItemPhone
					v-for="e in result?.findOneEmployer.employer.phone"
					:phone="e"
					:reload="reload"
				/>
				<EmployerAddPhone
					:data_exists="!!(result?.findOneEmployer.employer.phone && result?.findOneEmployer.employer.phone.length > 0)"
					:reload="reload"
				/>
			</div>

			<div class="flex flex-col gap-4">
				<h6>Redes sociales</h6>
				<EmployerItemSocial
					v-for="e in result?.findOneEmployer.employer.employer_social"
					:props="{
								id: e.id!,
								name: e.name,
								identifier: e.identifier,
								social: {
									name: e.social!.name,
									icon: e.social!.icon,
									prefix: e.social!.prefix,
									id: e.social!.id
								}
							}"
					:social="social"
					:reload="reload"
					:key="'social'+e.id"
				/>
				<EmployerAddSocial
					:data_exists="!!(result?.findOneEmployer.employer.employer_social && result?.findOneEmployer.employer.employer_social.length > 0)"
					:social="social!"
					:reload="reload"
				/>
			</div>
		</div>
	</UCard>
</template>
<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface, socialInterface} from "~/interfaces";
import {employerFindOne, socialFindAll} from "~/queries";

const route = useRoute()

const user = useUserStore()

const {result, refetch} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)})

const reload = async () => {
	await refetch()
	console.log(result)
}

const social: Ref<socialInterface[] | undefined> = ref([])
const social_data = await useAsyncQuery<{ socialFindAll: socialInterface[] }>(socialFindAll)
social.value = social_data.data.value?.socialFindAll
</script>

