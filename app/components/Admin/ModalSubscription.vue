<template>
	<UModal v-model="show">
		<UCard>
			<template #header>
				<div class="flex flex-row place-content-between">
					<h6>Agregar subscripción</h6>
					<div class="self-center p-2 text-violet-500" v-if="mutate_loading">
						<UIcon name="ri:loader-5-fill" class="animate-spin w-6 h-6"/>
					</div>
				</div>
			</template>
			<div class="flex flex-col gap-2 transition-height duration-500">

				<div class="flex flex-col gap-4">
					<div class="flex flex-row gap-2">
						<UFormGroup
							name="user"
							label="Usuario empleador"
							class="w-1/2"
							help="Solo se mostrarán usuarios que estén activos."
						>
							<USelectMenu
								color="gray"
								size="md"
								v-model="state.user"
								:loading="loading"
								:searchable="search"
								placeholder="Seleccione."
								option-attribute="full_name"
								trailing
								by="id"
							/>
						</UFormGroup>
						<UFormGroup
							name="plan"
							label="Plan"
							class="grow"
						>
							<USelect
								:options="plans"
								size="md"
								color="gray"
								option-attribute="name"
								v-model="state.plan"
								value-attribute="id"
							/>
						</UFormGroup>

					</div>
					<div>
						<UFormGroup label="Método de pago" name="payment_method">
							<USelectMenu
								:options="methods"
								color="gray"
								size="md"
								v-model="state.method"
								placeholder="Seleccione un método de pago"
							/>
						</UFormGroup>
					</div>

					<UAlert
						icon="ri:alert-line"
						color="green"
						variant="solid"
						description="Este usuario ya cuenta con una subscripción activa, la subscripción que compre ahora pasará a estar vigente cuando la suscripción actual expire."
						:class="state.current?.is_currently_subscribed ? 'block' : 'hidden'"
					/>
					<!--						v-if="state.current?.is_currently_subscribed"-->

					<div class="bg-violet-200 rounded-large p-4 justify-between row mb-4 flex"
					     v-if="state.current && !mutate_loading">
						<div class="h-full w-full flex flex-col text-start self-end">
							<span class="font-bold  inline-block">{{ state.current.full_name }}</span>
						</div>
						<div class="flex flex-col text-end w-full">
							<div class="items-center flex flex-row self-end mb-2">
								<UIcon :name="state.method?.icon!" size="14" class="mx-1"/>
								<span class="font-bold text-sm">{{ state.method?.label }}</span>
							</div>
							<span class="font-bold">Plan {{ plans[Number(state.plan) - 2]?.name }}</span>
							<span class="font-black text-5xl">{{ plans[Number(state.plan) - 2]?.price }} Bs.</span>
							<span class="font-bold">{{ (plans[Number(state.plan) - 2]?.price! / exchange_rate).toFixed(2) }} USD (Dólar americano)</span>
							<span class="font-semibold text-sm mt-4">Suscripción válida desde el {{
									es_date(state.current.starts_at)
								}} hasta el {{ es_date(state.current.ends_at) }}</span>
						</div>
					</div>

				</div>
			</div>
			<template #footer>
				<div class="flex flex-row justify-end gap-2">
					<UButton @click="close"
					         label="Cerrar"
					         color="black"
					/>
					<UButton
						label="Agregar"
						:disabled="!is_form_filled"
						@click="submit"
					/>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {UserInterface} from "~/interfaces";
import {subscriptionGql} from "~/queries";
import {es_date} from "~/helpers/es_date";

const show = defineModel('show', {required: true, type: Boolean})
const { reload } = defineProps<{ reload: () => Promise<void>}>()

const plans = usePostStore().plans.filter(plan => plan.id != 1)
const methods = [
	{
		value: 2,
		label: 'Dinero en efectivo',
		icon: 'ri:hand-coin-line'
	},
	{
		value: 3,
		label: 'Transferencia bancaria',
		icon: 'ri:qr-scan-2-line'
	}
]


const close = () => {
	show.value = false;
	state.current = undefined;
	state.user = undefined;
	state.plan = "2";
	state.method = methods[0];
}

const exchange_rate = 6.96

const state = reactive({
	user: undefined as UserInterface | undefined,
	plan: "2",
	method: methods[0],
	current: undefined as {
		ends_at: Date;
		full_name: string;
		id: number;
		is_currently_subscribed: boolean;
		starts_at: Date;
	} | undefined
})

const loading = ref(false)


const {mutate: mutate_show, loading: mutate_loading} = useMutation<{
	subscriptionShowPotentialUserSubscription: {
		ends_at: Date;
		full_name: string;
		id: number;
		is_currently_subscribed: boolean;
		starts_at: Date
	} | undefined
}>(subscriptionGql.show_potential_user_subscription)
const show_potential_user_subscription = async () => {
	if (!(state.user && state.plan && state.method)) return
	await mutate_show({
		"showUserSubscriptionInput": {
			"id_plan": Number(state.plan),
			"id_user": Number(state.user?.id)
		}
	})
		.then((e) => state.current = e?.data?.subscriptionShowPotentialUserSubscription)
		.catch((e) => console.log(e))
}

const {mutate} = useMutation<{ subscriptionList: UserInterface[] }>(subscriptionGql.list)
const search = async (q: string) => {
	let values: UserInterface[] = []
	loading.value = true
	await mutate({
		"query": q
	}).then(async (e) => {
		values = e?.data?.subscriptionList || []
	})
		.catch((e) => console.log(e))
		.finally(() => loading.value = false)
	return values.map((e) => ({
		full_name: e.contact.first_name + ' ' + e.contact.last_name,
		id: e.id,
	}))
}

watch(
	() => [state.user, state.plan, state.method],
	async () => {
		await show_potential_user_subscription()
	}
)

const is_form_filled = computed(() => {
	return !!(state.user && state.plan && state.method)
})

const {mutate: mutate_create, loading: loading_create} = useMutation(subscriptionGql.create)

const submit = async () => {
	if (!(state.user && state.plan && state.method)) return
	await mutate_create({
		"createSubscriptionInput": {
			"autorenew": false,
			"id_plan": Number(state.plan),
		},
		"idMethod": Number(state.method?.value),
		"idUser": Number(state.user.id)
	}).then(async () => {
		await reload()
		useToast().add({title: 'Subscripción creada con éxito'})
		close()
	}).catch((e) => console.log(e))
}
</script>