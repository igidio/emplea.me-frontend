<template>
	<div class="flex flex-col tablet:flex-row gap-4 w-full">

		<div class="flex flex-col gap-4 grow">
			<div class="bg-violet-200 rounded-large p-4 justify-between flex row">
				<div class="flex flex-col">
					<span class="font-bold">Plan {{ plan.name }}</span>
					<span class="font-black text-5xl">{{ plan.price }} {{ plan.currency }}</span>
					<span class="font-bold">{{ (plan.price / exchangeRate).toFixed(2) }} USD (Dólar americano)</span>
				</div>
			</div>

			<div class="w-64 self-center">
				<PaymentCardPreview
					:is_card_flipped="is_card_flipped"
					:card="state"
				/>
			</div>
		</div>

		<div class="flex flex-col tablet:max-w-[50%] gap-2">

			<UCard>
				<!--				:schema="order_schema"-->
				<UForm
					@submit.prevent="submit_form()"
					:state="state"
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

					<UButton type="submit" label="Pagar 100 Bs." block/>
				</UForm>
			</UCard>

			<div class="flex flex-col gap-1 text-end">
				<div class="flex flex-row items-center self-end">
					<span class="font-semibold mr-2">Impulsado por</span>
					<UIcon name="fa-brands:stripe" size="30px"></UIcon>
				</div>
				<NuxtLink class="hyper"><span class="text-sm">Términos</span></NuxtLink>
				<NuxtLink class="hyper"><span class="text-sm">Privacidad</span></NuxtLink>
			</div>
		</div>

	</div>

</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import type {PlanInterface} from "~/interfaces";
import {plans} from "~/data/plans.data";
import {order_schema} from "~/schemas/order.schema";
import allowed_cards from "~/data/allowed-cards.data";
import {paymentCreateTransaction} from "~/queries";

const exchangeRate = 6.91
const is_invalid_expiration_date: Ref<undefined | string> = ref(undefined)

const {mutate, loading} = useMutation(paymentCreateTransaction)

const state = reactive({
	card_number: '',
	card_holder: '',
	expiry: '',
	cvv: '',
	auto_renew: false,
})

const is_card_flipped = ref(false)
const errors = ref({})

// PLAN
const id = Number(useRoute().params.id)
if (!id) {
	useRouter().push('/')
}

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

const submit_form = async () => {
	let card_token = allowed_cards[state.card_number.replace(/[^\d]/g, '') as keyof typeof allowed_cards]

	const variables = {
		"input": {
			"amount": Number((plan.price / exchangeRate).toFixed(2))*100,
			"currency": "usd",
			"token": card_token ? card_token : "tok_visa_chargeDeclined"
		}
	}

	await mutate(variables);

}
</script>
