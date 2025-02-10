<template>
	<UCard>
		<template #header>Administrar asistentes</template>
		<div class="flex flex-col gap-4">
			<p>Recuerda que puedes disponer de hasta cuatro empleados en un negocio</p>
			<AdminAttendantTable
				:attendants="attendants"
				:options="options"
			/>
			<AdminAddAttendant/>
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

const options = (row: any) => [
	[
		...([{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: () => {
				modal_data.value.is_open = true
				modal_data.value.header = (row.is_active) ? 'Deshabilitar publicación' : 'Volver a habilitar publicación'
				modal_data.value.id = row.id
			}
		}]),
		{
			label: 'Editar',
			icon: 'ri:edit-line',
			click: () => useRouter().push(`/admin/posts/${row.id}`)
		}
	]
]
</script>