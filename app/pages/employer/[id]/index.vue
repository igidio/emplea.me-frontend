<template>
	<EmployerPage :data="data.findOneEmployer" v-if="data"/>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

const route = useRoute()

const {data} = useAsyncQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(), {"findOneEmployerId": Number(route.params.id)})
console.log(data.value)
</script>
