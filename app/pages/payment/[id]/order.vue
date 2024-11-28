<template>
	<div class="flex flex-row gap-4">
		
		<div class="flex flex-col grow bg-violet-200 rounded-large p-4 justify-between">
			<div class="flex flex-col">
				<span class="font-bold">Plan {{ plan.name }}</span>
				<span class="font-black text-5xl">{{ plan.price }} {{ plan.currency }}</span>
				<span class="font-bold">{{ (plan.price / exchangeRate).toFixed(2) }} USD (Dólar americano)</span>
			</div>
			
			<div class="flex flex-col gap-2">
				<div class="flex flex-row items-center">
					<span class="font-semibold mr-2">Impulsado por</span>
					<UIcon name="fa-brands:stripe" size="40px"></UIcon>
				</div>
				<NuxtLink class="hyper">Términos</NuxtLink>
				<NuxtLink class="hyper">Privacidad</NuxtLink>
			</div>
		
		</div>
		
		<UCard class="grow">
			<div class="flex flex-col gap-4">
				<UFormGroup
					label="Nombre del titular"
					required
				>
					<UInput color="gray" size="lg" placeholder="Nombres y apellidos"/>
				</UFormGroup>
				
				
				<UFormGroup
					label="País"
					required
				>
					<USelectMenu
						size="lg"
						color="gray"
						searchable
						searchable-placeholder="Bolivia"
						option-attribute="name"
					/>
				</UFormGroup>
				
				<UFormGroup
					label="Número de tarjeta"
					required
				>
					<UInput placeholder="XXXX XXXX XXXX XXXX" color="gray" size="lg">
						<template #trailing>
							<div class="flex flex-row gap-1">
								<UIcon name="fa6-brands:cc-amex" size="30px" class="bg-blue-600"/>
								<UIcon name="fa6-brands:cc-visa" size="30px" class="bg-blue-600"/>
								<UIcon name="fa6-brands:cc-mastercard" size="30px" class="bg-red-500"/>
								<UIcon name="logos:unionpay" size="27px"/>
							</div>
						</template>
					</UInput>
				</UFormGroup>
				
				<div class="flex flex-row gap-4">
					<UFormGroup
						label="Expiración"
						required
						class="grow"
					>
						<UInput color="gray" size="lg" placeholder="MM / YY"/>
					</UFormGroup>
					<UFormGroup
						label="CVC"
						required
						class="grow"
					>
						
						<UInput placeholder="XXX" color="gray" size="lg">
							<template #trailing>
								<div class="flex flex-row gap-1">
									<UIcon name="ri:bank-card-fill" size="20px"/>
								</div>
							</template>
						</UInput>
					</UFormGroup>
					
				</div>
				<UCheckbox label="Renovar automáticamente"/>
				<UButton size="lg" label="Pagar 150 Bs."/>
			</div>
		</UCard>
	
	</div>

</template>

<script setup lang="ts">
import {plans} from "~/data/plans.data";
import type {PlanInterface} from "~/interfaces";

const exchangeRate = 6.91
const id = useRoute().params.id

const plan: PlanInterface = plans[id]

</script>