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
			<div>
				<h6>Redes sociales</h6>
<!--				<EmployerItemSocial/>-->
<!--				<EmployerAddSocial/>-->
			</div>
		</div>
	</UCard>
</template>
<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

const route = useRoute()

const user = useUserStore()

const {result, refetch} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)})

const reload = async () => {
	await refetch()
	console.log(result)
}
</script>

