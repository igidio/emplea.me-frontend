<template>
	<EmployerPage :data="result.findOneEmployer" v-if="result"/>
	<div class="w-full full-content bg-red-500" v-if="loading">
		<UIcon
			name="ri:loader-3-fill"
			size="30"
			class="animate-spin"
		/>
	</div>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

const route = useRoute()

const {result, refetch, loading} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(), {"findOneEmployerId": Number(route.params.id)}, {prefetch: false})

onMounted(async () => await refetch())
</script>
