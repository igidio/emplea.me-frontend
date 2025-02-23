<template>
	<AdminModalChangePrice
		v-model:is_open="is_open"
		:selected_plan="selected_plan"
		v-if="selected_plan !== undefined"
	/>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Panel',
      to: `/admin`
		}, {
			label: 'Planes',
      to: `/admin/plans`
		}]"/>
		<UCard>
			<template #header>Planes</template>
			<div class="flex flex-col gap-4">
				<UTable
					:columns="columns"
					:rows="rows"
					:loading="loading"
					:sort="{
						column: 'name',
						direction: 'asc'
					}"
				>
					<template #options-data="{row}">
						<UDropdown
							:items="options(row)"
							:ui="{width: 'w-56'}"
							v-if="options(row).flat().length > 0"
						>
							<UButton color="gray" variant="ghost" icon="ri:more-fill"/>
						</UDropdown>
					</template>
					<template #price-data="{row}">
						<div class="flex flex-col">
							<span>{{ (row.price).toFixed(2) }} Bs.</span>
							<span>{{ (row.price * 6.96).toFixed(2) }} USD (Dólar americano)</span>
						</div>
					</template>
					<template #duration-data="{row}">
						<span>{{ row.duration }} {{ (row.duration <= 1) ? 'mes' : 'meses' }}</span>
					</template>
				</UTable>
			</div>
		</UCard>
	</div>

</template>

<script setup lang="ts">
import ModalJoinByMail from "~/components/Admin/ModalJoinByMail.vue";
import type {TableColumn} from "#ui/types";

const { plans } = storeToRefs(usePostStore())
const loading = ref(false)
const is_open = ref(false)
const selected_plan = ref<number|undefined>(undefined)

definePageMeta({
	middleware: 'role',
	roles: ['SUPERUSER', 'ADMIN'],
	keepalive: false,
})
useHead({
	title: 'Planes'
})


const columns:TableColumn[] = [
	{label: 'Nombre', key: 'name' },
	{label: 'Precio', key: 'price'},
	{label: 'Duración', key: 'duration', direction: 'asc', sortable: true},
	{label: 'Opciones', key: 'options'},
]

const rows = computed(() => {
	return (plans.value && plans.value.length > 0) ? plans.value.map((e: any) => ({
		id: e.id,
		name: e.name,
		price: e.price,
		duration: e.duration,
		options: e.id,
	})).filter((e) => e.id != 1) : []
})

const options = (row: any) => [
	[
		{
			label: 'Cambiar precio',
			icon: 'ri:money-dollar-circle-line',
			click: () => {
				selected_plan.value = +row.id
				is_open.value = true
			}
		}
	]
]
</script>