<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Panel',
      to: `/admin`
		}, {
			label: 'Asistentes',
      to: `/admin/attendants`
		}]"/>
		<UCard>
			<template #header>Asistentes{{
					router.currentRoute.value.query.q && `: ${router.currentRoute.value.query.q}`
				}}
			</template>
			<div class="flex flex-col gap-4">

				<div class="flex flex-row gap-4">
					<USelectMenu
						:searchable="search_employer"
						searchable-placeholder="Buscar empleador"
						:options="employers"
						size="md"
						color="gray"
						option-attribute="name"
						v-model="current_employer"
						placeholder="Seleccione un empleador"
					>
						<template #leading>
							<img
								:src="(current_employer) ? current_employer.profile_image : '/images/empleame_employer_silhouette.png'"
								alt="Foto de perfil"
								class="w-5 h-5 border rounded-small"
							/>
						</template>
					</USelectMenu>
					<div class="w-4">
						<UIcon
							name="ri:loader-5-line"
							class="animate-spin text-gray-500"
							size="32"
							v-if="loading_list_by_query"
						/>
					</div>
				</div>

				<p>Recuerda que se puede disponer de hasta cuatro empleados en un negocio.</p>
				<AdminAttendantTable
					:attendants="attendants"
					:options="options"
					:loading="loading"
					v-if="result?.employerUserFindByEmployer && result?.employerUserFindByEmployer.length > 0"
				/>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerUserFindByEmployer, gqlEmployer, gqlEmployerUser} from "~/queries";

const attendants = ref<EmployerUserInterface[]>([])
const router = useRouter()

definePageMeta({
	middleware: 'role',
	roles: ['ADMIN', 'SUPERUSER'],
	keepalive: false,
})
useHead({
	title: 'Asistentes'
})

const {
	refetch: refetch_list_by_query,
	loading: loading_list_by_query,
} = useQuery<{
	employerListByQuery: EmployerInterface[]
}>(gqlEmployer.list_by_query)

const employers = ref<EmployerInterface[]>([])
const current_employer = ref<EmployerInterface>()

const {
	result,
	refetch,
	loading
} = useQuery<{
	"employerUserFindByEmployer": EmployerUserInterface[]
}>(employerUserFindByEmployer, {}, {prefetch: false})

const reload = async (id: number) => {
	await refetch({"employerUserFindByEmployerId": +id})?.then((result) => console.log(result))
	attendants.value = result.value?.employerUserFindByEmployer || []
}

onMounted(async () => {
	await refetch_list_by_query()
	if (router.currentRoute.value.query.id) {
		await reload(+router.currentRoute.value.query.id)
	}
})

const search_employer = async (q: string) => {
	await refetch_list_by_query({"query": q} as any)?.then((res) => {
		employers.value = res?.data?.employerListByQuery || []
	})
	return employers.value
}

watch(current_employer, async (value) => {
	console.log(value)
	if (value) {
		await reload(+value.id)
	}
	await useRouter().push({
		query: {
			id: (value!.id).toString(),
			q: (value!.name).toString()
		}
	})

})

const {mutate: mutate_toggle_active} = useMutation(gqlEmployerUser.toggle_active)
const toggle_active = async (id: number) => {
	await mutate_toggle_active({
		"employerToggleActiveId": +id,
		"idEmployer": +current_employer.value?.id!
	}).then(async () => {
		await reload(+current_employer.value?.id!)
		useToast().add({title: 'Estado de asistente actualizado correctamente.'})
	}).catch((e) => alert(e.message))
}

const {mutate: mutate_toggle_level} = useMutation(gqlEmployerUser.toggle_level)
const toggle_level = async (id: number) => {
	await mutate_toggle_level({
		"employerToggleLevelId": +id,
		"idEmployer": +current_employer.value?.id!
	}).then(async () => {
		await reload(+current_employer.value?.id!)
		useToast().add({title: 'Nivel de asistente actualizado correctamente.'})
	}).catch((e) => alert(e.message))
}

const {mutate: mutate_delete_unconfirmed} = useMutation(gqlEmployerUser.delete_unconfirmed)
const delete_unconfirmed = async (id: number) => {
	await mutate_delete_unconfirmed({
		"employerUserDeleteUnconfirmedId": +id,
		"idEmployer": +current_employer.value?.id!
	}).then(async () => {
		await reload(+current_employer.value?.id!)
		useToast().add({title: 'Asistente sin confirmar eliminado correctamente.'})
	}).catch((e) => alert(e.message))
}

const options = (row: any) => [
	[
		...((row.has_confirm && !row.is_first_user) ? [{
			label: (row.is_active) ? 'Deshabilitar' : 'Volver a habilitar',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => await toggle_active(row.id)
		}] : []),
		...((row.has_confirm && !row.is_first_user) ? [{
			label: (row.level === 'ATTENDANT') ? 'Asignar como administrador' : 'Asignar como engargado',
			icon: (row.is_active) ? 'ri:close-circle-line' : 'ri:arrow-up-circle-line',
			click: async () => await toggle_level(row.id)
		}] : []),

		...((!row.has_confirm) ? [{
			label: 'Eliminar',
			icon: 'ri:delete-bin-line',
			click: async () => await delete_unconfirmed(row.id)
		}] : [])
	]
]

</script>