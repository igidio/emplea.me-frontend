<template>
	<UCard>
		<template #header>Historial de pago</template>
		<UTable
			:rows="rows"
			:columns="columns"
			:loading="loading"
		>
			<template #amount-data="{row}">
				<div class="flex flex-col gap-1">
					<span>{{ row.amount.bob }} BOB</span>
					<span>{{ row.amount.usd }} USD</span>
				</div>
			</template>
			<template #date_interval-data="{row}">
				<div class="flex flex-col gap-1">
					<span>Incio: {{ row.date_interval.starts_at }}</span>
					<span>Finalización {{ row.date_interval.ends_at }}</span>
				</div>
			</template>

			<template #method-data="{row}">
				<div class="flex flex-col gap-1 bg-gray-100 p-2 rounded-medium w-24">
					{{ TransactionTypeEnum[row.method.type as unknown as keyof typeof TransactionTypeEnum] }}
					<div
						class="flex flex-row place-items-center place-content-between"
						v-if="row.method.type === 'CARD' ">
						<UIcon
							size="16px"
							:name="brands[row.brand as keyof typeof brands]['icon']"
							:class="brands[row.brand as keyof typeof brands]['color']"
							v-if="row.brand"
						/>
						<span v-else/>
						<span>**{{ row.last_four }}</span>

					</div>
				</div>
			</template>
			<template #status-data="{row}">
				<UBadge
					:color="row.status == 'Aprobado' ? 'green' : 'gray'"
					variant="soft"
				>{{ row.status }}
				</UBadge>
			</template>
			<template #empty-state>
				<div
					class="flex flex-col items-center justify-center py-6 gap-3"
					v-if="user_role === 'EMPLOYER'"
				>
					<span class="italic text-sm">No has realizado ningún pago anteriormente</span>
					<NuxtLink to="/payment">
						<UButton label="Volverme un premium"/>
					</NuxtLink>
				</div>
				<div
					class="flex flex-col items-center justify-center py-6 gap-3"
					v-else>
					<span class="italic text-sm">No se encontraron pagos.</span>
				</div>
			</template>
		</UTable>
		<UPagination v-model="page" :page-count="pageCount" :total="elements.length"/>
	</UCard>

</template>

<script setup lang="ts">
import type {SubscriptionInterface} from "~/interfaces";
import type {TableColumn} from "#ui/types";
import {es_date} from "~/helpers/es_date";
import {TransactionStatusEnum, TransactionTypeEnum} from "~/enums";
import {format_date} from "~/helpers";

const props = defineProps<{
	subscriptions: SubscriptionInterface[],
	loading: boolean
}>()
const {subscriptions} = toRefs(props)

const page = ref(1)
const pageCount = 8
const {user_role} = useUserStore()

const elements = computed(() => {
	return subscriptions.value.map((e: SubscriptionInterface) => ({
		id: e.id,
		plan: e.plan.name,
		date: es_date(e.created_at!, true),
		date_interval: {
			starts_at: format_date(new Date(e.starts_at)),
			ends_at: format_date(new Date(e.ends_at))
		},
		end_date: es_date(e.ends_at),
		amount: {
			usd: e.transaction.amount.toFixed(2),
			bob: (e.transaction.amount * 6.91).toFixed(2),
		},
		brand: e.transaction.brand,
		last_four: e.transaction.last_four,
		method: e.transaction.method,
		status: TransactionStatusEnum[e.transaction.status as unknown as keyof typeof TransactionStatusEnum],
	}))
})

const columns: TableColumn[] = [
	// {label: 'ID', key: 'id'},
	{label: 'Plan', key: 'plan'},
	{label: 'Fecha de transacción', key: 'date'},
	{label: 'Fechas de inicio y fin', key: 'date_interval'},
	{label: 'Monto', key: 'amount'},
	{label: 'Método de pago', key: 'method'},
	{label: 'Estado', key: 'status'},
]


const rows = computed(() => {
	return elements.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const brands = {
	'visa': {
		icon: 'fa6-brands:cc-visa',
		color: 'bg-blue-600',
		size: '18px'
	},
	'mastercard': {
		icon: 'fa6-brands:cc-mastercard',
		color: 'bg-red-500'
	},
	'amex': {
		icon: 'fa6-brands:cc-amex',
		color: 'bg-blue-600'
	},
	'unionpay': {
		icon: 'material-symbols:upi-pay',
		color: 'bg-green-700'
	},
	'discover': {
		icon: 'fa6-brands:cc-discover',
		color: 'bg-orange-500'
	},
	'jcb': {
		icon: 'fa6-brands:cc-jcb',
		color: 'bg-red-500'
	},
	'diners': {
		icon: 'fa6-brands:cc-diners-club',
		color: 'bg-blue-600'
	},

}

</script>