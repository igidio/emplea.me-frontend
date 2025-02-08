<template>
	<div class="flex flex-col items-center gap-6">
		<div class="flex flex-col text-center gap-1">
		<h1>Ser Premium tiene sus beneficios</h1>
		<span>⭐ Destacar tus trabajos aumentan el alcance para llenar una vacante.</span>
		</div>
		
		<div class="flex flex-col desktop:flex-row gap-4 desktop:h-96 w-96 desktop:w-fit">
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
definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER']
})

const { plans } = usePostStore()


const current = ref(0)
</script>