<template>
	<EmployerPage :data="result.findOneEmployer" v-if="result"/>
	<ClientOnly>
		<div class="w-full full-content h-full flex flex-col justify-center" v-if="loading">
			<UIcon
				name="ri:loader-3-fill"
				size="30"
				class="animate-spin self-center"
			/>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

const route = useRoute()
const user = useUserStore()

const {result, refetch, loading} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)}, {prefetch: false})

onMounted(async () => await refetch())
</script>
