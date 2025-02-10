<template>
	<UCard>
		<template #header>Administrar asistentes</template>
		<div class="flex flex-col gap-4">
			<p>Recuerda que puedes disponer de hasta cuatro empleados en un negocio</p>
			<AdminAttendantTable
				:attendants="attendants"
				:options="options"
			/>
			<AdminAddAttendant
				v-if="active_length <= 4"
				:reload="refetch"
			/>
			<UAlert
				v-else
				description="No puedes agregar más asistentes, el límite es de cuatro asistentes activos." color="red"
			/>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import {employerUserFindByEmployer} from "~/queries";
import type {EmployerUserInterface} from "~/interfaces";

const attendants = ref<EmployerUserInterface[]>([])

const {result, refetch} = useQuery<{
	"employerUserFindByEmployer": EmployerUserInterface[]
}>(employerUserFindByEmployer, {
	"employerUserFindByEmployerId": Number(useRoute().params.id)
}, {prefetch: true})
attendants.value = result.value?.employerUserFindByEmployer || []

onMounted(() => {
	refetch()
})

const options = (row: any) => [
	[
		...((row.has_confirm) ? [{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: () => {
				// TODO: Deshabilitar o habilitar asistente
			}
		}] : []),
		...((!row.has_confirm) ? [{
				label: 'Eliminar',
				icon: 'ri:delete-bin-line',
				click: () => {

				}
			}] : []
		)
	]
]

const active_length = computed(() => attendants.value.filter((e: EmployerUserInterface) => e.is_active).length)
</script>