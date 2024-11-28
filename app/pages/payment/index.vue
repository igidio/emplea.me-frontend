<template>
	<div class="flex flex-col items-center gap-6">
		<div class="flex flex-col text-center gap-1">
		<h1>Ser Premium tiene sus beneficios</h1>
		<span>⭐ Destacar tus trabajos aumentan el alcance para llenar una vacante.</span>
		</div>
		
		<div class="flex flex-row gap-4 h-96">
			<PaymentOptionCard
				:props="plan"
				:current="current === index"
				:index="index"
				v-for="(plan, index) in plans"
			/>
		</div>
	</div>

</template>


<script setup lang="ts">
import {plans} from "~/data/plans.data";
const current = ref(0)
</script>