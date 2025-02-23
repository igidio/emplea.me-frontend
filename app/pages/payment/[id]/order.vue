<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Sé un premium',
      to: '/payment'
		},{
			label: plan.name,
			to: `/payment/${plan.id}`
		}, {
			label: 'Pagar con tarjeta',
      to: `/payment/${plan.id}/order`
		}]"/>

		<UAlert
			color="green"
			class="mb-4"
			title="Ya cuentas con una suscripción"
			description="Todos los planes que compres mientras tengas una suscripción activa pasan a activarse automáticamente al finalizar tu suscripción actual."
			v-if="is_premium"
		/>

		<div class="bg-violet-200 rounded-large p-4 justify-between row mb-4 desktop:hidden flex">
			<div class="flex flex-col text-end w-full">
				<span class="font-bold">Plan {{ plan.name }}</span>
				<span class="font-black text-5xl">{{ plan.price }} Bs.</span>
				<span class="font-bold">{{ (plan.price / exchange_rate).toFixed(2) }} USD (Dólar americano)</span>
			</div>
		</div>
		<div class="flex flex-col desktop:flex-row gap-4 w-full">

			<div class="flex flex-col gap-4 grow">

				<div class="h-full align-middle place-content-center self-center">
					<div class="w-64 ">
						<PaymentCardPreview
							:is_card_flipped="is_card_flipped"
							:card="state"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-col desktop:max-w-96 gap-4">
				<div class="bg-violet-200 rounded-large p-4 justify-between row hidden desktop:flex">
					<div class="flex flex-col text-end w-full">
						<span class="font-bold">Plan {{ plan.name }}</span>
						<span class="font-black text-5xl">{{ plan.price }} Bs.</span>
						<span class="font-bold">{{ (plan.price / exchange_rate).toFixed(2) }} USD (Dólar americano)</span>
					</div>
				</div>

				<UCard>
					<!--				:schema="order_schema"-->
					<UForm
						@submit.prevent="submit_form()"
						:state="state"
						:schema="schema"
						class="flex flex-col gap-4"

					>
						<!-- Card Number -->
						<div>
							<UFormGroup
								label="Número de tarjeta"
								required
								name="card_number"
							>
								<UInput
									v-model="state.card_number"
									type="text"
									maxlength="19"
									:oninput="format_card_number()"
									placeholder="•••• •••• •••• ••••"
									color="gray"
								>
									<template #trailing>
										<div class="flex flex-row gap-1">
											<UIcon name="fa6-brands:cc-visa" size="18px" class="bg-blue-600"/>
											<UIcon name="fa6-brands:cc-mastercard" size="18px" class="bg-red-500"/>
											<UIcon name="fa6-brands:cc-amex" size="18px" class="bg-blue-600"/>
											<UIcon name="logos:unionpay" size="15px"/>
										</div>
									</template>
								</UInput>
							</UFormGroup>
						</div>

						<!-- Card Holder -->
						<div>
							<UFormGroup
								label="Nombre del titular"
								required
								name="card_holder"
							>
								<UInput
									v-model="state.card_holder"
									:oninput="format_card_holder()"
									type="text"
									maxlength="50"
									placeholder="Nombre del titular"
									color="gray"
								/>

							</UFormGroup>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<!-- Expiry -->
							<div>
								<UFormGroup
									label="Fecha de expiración"
									required
									name="expiry"
									:error="is_invalid_expiration_date"
								>
									<UInput
										v-model="state.expiry"
										type="text"
										maxlength="5"
										placeholder="MM/YY"
										:oninput="format_expiry()"
										color="gray"
									/>
								</UFormGroup>
							</div>

							<!-- CVV -->
							<div>
								<UFormGroup
									label="CVV"
									required
									name="cvv"
								>
									<UInput
										v-model="state.cvv"
										type="text"
										maxlength="4"
										@focus="is_card_flipped = true"
										@blur="is_card_flipped = false"
										color="gray"
									/>
								</UFormGroup>
							</div>
						</div>

						<UCheckbox
							label="Renovar automáticamente"
							v-model="state.auto_renew"
						/>

						<span class="error" v-if="error">{{ error.message }}</span>
						<UButton type="submit" label="Pagar 100 Bs." block :disabled="loading"/>
					</UForm>
				</UCard>

				<div class="flex flex-col gap-0 text-end">
					<div class="flex flex-row items-center self-end">
						<span class="font-semibold mr-1">Impulsado por</span>
						<UIcon name="fa-brands:stripe" size="30px"></UIcon>
					</div>
					<div class="flex flex-col gap-1">
						<NuxtLink class="hyper text-sm" to="/payment/terms_and_privacy">Términos y privacidad</NuxtLink>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ["order", "role"],
	roles: ["EMPLOYER"]
})

import type {employer_info_interface, PlanInterface, SubscriptionInterface} from "~/interfaces";
import allowed_cards from "~/data/allowed-cards.data";
import {subscriptionCreate, subscriptionUserDetails} from "~/queries";
import {order_schema} from "~/schemas/order.schema";

const exchange_rate = 6.91
const is_invalid_expiration_date: Ref<undefined | string> = ref(undefined)

const {plans} = usePostStore()
const {is_premium, set_employer_info} = useUserStore()
const schema = order_schema

const state = reactive({
	card_number: '',
	card_holder: '',
	expiry: '',
	cvv: '',
	auto_renew: false,
})

const is_card_flipped = ref(false)

// PLAN
const id = Number(useRoute().params.id)
const plan: PlanInterface = plans[id]!

const format_card_number = () => {
	let value = state.card_number.replace(/[^\d]/g, '')
	let formatted_value = ''
	for (let i = 0; i < value.length; i++) {
		if (i > 0 && i % 4 === 0) {
			formatted_value += ' '
		}
		formatted_value += value[i]
	}

	state.card_number = formatted_value
}

const format_card_holder = () => {
	state.card_holder = state.card_holder.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').replace(/\B\w/g, char => char.toLowerCase());
}

const format_expiry = () => {
	let value = state.expiry.replace(/\D/g, '')

	if (value.length >= 2) {
		value = value.slice(0, 2) + '/' + value.slice(2)
	}

	state.expiry = value
}

const {load, result, refetch} = useLazyQuery<{ "subscriptionUserDetails": employer_info_interface }>(subscriptionUserDetails)
await load()

const {mutate, loading, error} = useMutation<{ "subscriptionCreateByCard": SubscriptionInterface }>(subscriptionCreate)
const submit_form = async () => {
	let card_token = allowed_cards[state.card_number.replace(/[^\d]/g, '') as keyof typeof allowed_cards]

	const variables = {
		"createSubscriptionInput": {
			"autorenew": state.auto_renew,
			"id_plan": id
		},
		"createPaymentIntentInput": {
			"token": card_token ? card_token : "tok_visa_chargeDeclined"
		}
	}
	await mutate(variables).then(async () => {
			await refetch()
			set_employer_info(result.value?.subscriptionUserDetails!)
			await useRouter().push('/history')
		}
	).catch((error) => {
		console.log(error)
	});
}

useHead({
	title: 'Pagar ' + plan.name
})
</script>
