<template>
	<div class="flex flex-col items-center gap-6">
		<div class="flex flex-col text-center gap-1">
		<h1>Ser Premium tiene sus beneficios</h1>
		<span>⭐ Destacar tus trabajos aumentan el alcance para llenar una vacante.</span>
		</div>
		
		<div class="flex flex-row gap-4 h-96">
			<PaymentOptionCard :props="plan" :current="current === index" v-for="(plan, index) in plans"/>
		</div>
	</div>

</template>


<script setup lang="ts">


import type {PlanInterface} from "~/interfaces";


const plans: PlanInterface[] = [
	{
		name: "Plan Gratuíto",
		price: 0,
		currency: "Bs.",
		benefits: [
			"Publicar hasta 2 trabajos activos.",
		],
		color: "bg-white"
	},
	{
		name: "Premium - 1 Mes",
		price: 40,
		currency: "Bs.",
		benefits: [
			"Publicar hasta 5 trabajos.",
			"Puedes destacar hasta 2 trabajos.",
			"Navegación sin anuncios."
		],
		color: "bg-yellow-400"
	},
	{
		name: "Premium - 3 Meses",
		price: 100,
		currency: "Bs.",
		benefits: [
			"Publicar hasta 6 trabajos.",
			"Puedes destacar hasta 3 trabajos.",
			"Navegación sin anuncios.",
			"Ahorra un 17%"
		],
		color: "bg-yellow-400"
	},
	{
		name: "Premium - 6 Meses",
		price: 150,
		currency: "Bs.",
		benefits: [
			"Publicar hasta 8 trabajos.",
			"Puedes destacar hasta 4 trabajos.",
			"Navegación sin anuncios.",
			"Ahorra un 38%"
		],
		color: "bg-yellow-400"
	},

]

const current = ref(0)
</script>