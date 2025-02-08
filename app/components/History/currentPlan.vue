<template>
	<UCard :class="`bg-${employer_info.plan.color}`">
		<div class="flex flex-col gap-1">
			<div class="justify-between flex flex-row">
				<h5>{{ employer_info.plan.name }}</h5>
				<NuxtLink to="/payment">
					<UButton label="Mejorar" size="sm" v-if="Number(employer_info.plan.id) === 1"/>
				</NuxtLink>
			</div>

			<span class="text-xl font-bold">{{ employer_info.plan.price }} Bs.</span>
			<span>Con este plan puedes:</span>
			<ul class="list-disc list-inside">
				<li v-for="benefit in employer_info.plan.benefits.split(';')">{{ benefit }}</li>

			</ul>
		</div>
	</UCard>

</template>

<script setup lang="ts">
const {plans} = usePostStore()
const {employer_info} = useUserStore()
</script>