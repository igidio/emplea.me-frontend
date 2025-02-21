<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: result?.findOneEmployer.employer.name!,
      to: `/employer/${result?.findOneEmployer.employer.id}`
		}]"/>

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
	</div>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

definePageMeta({
	keepalive: false
})

const route = useRoute()
const user = useUserStore()

const {result, refetch, loading} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role as any !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)}, {prefetch: false})


onMounted(async () => {
		await refetch()
		console.log(result)
		if (result.value) {
			document.title = result.value.findOneEmployer.employer.name;
		}
	}
)
</script>

