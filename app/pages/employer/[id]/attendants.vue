<template>
	<div class="flex flex-col gap-4">

		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: result_employer?.findOneEmployer.employer?.name!,
      to: `/employer/${result_employer?.findOneEmployer.employer.id}`
		}, {
			label: 'Administrar asistentes',
      to: `/employer/${route.params.id}/edit`
		}]"/>
		<UCard>
			<template #header>
				<div class="flex flex-row justify-between gap-4">
					Administrar asistentes
					<UButton icon="ri:reset-left-fill" color="gray" @click="reload()"/>
				</div>
			</template>
			<div class="flex flex-col gap-4">
				<p>Recuerda que puedes disponer de hasta cuatro empleados en un negocio</p>
				<AdminAttendantTable
					:attendants="attendants"
					:options="options"
					:loading="loading"
				/>
				<AdminAddAttendant
					v-if="active_length <= 4"
					:reload="reload"
				/>
				<UAlert
					v-else
					description="No puedes agregar más asistentes, el límite es de cuatro asistentes activos." color="red"
				/>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
import {employerFindOne, employerUserFindByEmployer, gqlEmployerUser} from "~/queries";
import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";

definePageMeta({
	middleware: 'role',
	roles: ['EMPLOYER'],
	keepalive: false,
})
useHead({
	title: 'Administrar encargados'
})

const attendants = ref<EmployerUserInterface[]>([])
const user = useUserStore()
const route = useRoute()


const {result: result_employer, refetch: refetch_employer} = useQuery<{
	findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
}>(employerFindOne(user.user_role as any !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(route.params.id)})


const {result, refetch, loading} = useQuery<{
	"employerUserFindByEmployer": EmployerUserInterface[]
}>(employerUserFindByEmployer, {
	"employerUserFindByEmployerId": Number(useRoute().params.id)
}, {prefetch: true})

onMounted(async () => {
	await reload()
})

const reload = async () => {
	await refetch()
	await refetch_employer()
	attendants.value = result.value?.employerUserFindByEmployer || []
}

if (!result_employer.value?.findOneEmployer.employer.is_verified) {
	await useRouter().replace(`/employer/${result_employer.value?.findOneEmployer.employer.id}`)
	if (import.meta.client) useToast().add({title: 'No puedes editar un empleador no verificado.'})
}

const { mutate: mutate_toggle_active } = useMutation(gqlEmployerUser.toggle_active)
const toggle_active = async ( id:number ) => {
	await mutate_toggle_active({
		"employerToggleActiveId": +id,
		"idEmployer": +route.params.id!
	}).then(async () => {
		await reload()
		useToast().add({title: 'Estado de asistente actualizado correctamente.'})
	}).catch((e) => alert(e.message))
}

const { mutate: mutate_toggle_level } = useMutation(gqlEmployerUser.toggle_level)
const toggle_level = async ( id:number ) => {
	await mutate_toggle_level({
		"employerToggleLevelId": +id,
		"idEmployer": +route.params.id!
	}).then(async () => {
		await reload()
		useToast().add({title: 'Nivel de asistente actualizado correctamente.'})
	}).catch((e) => alert(e.message))
}

const { mutate: mutate_delete_unconfirmed } = useMutation(gqlEmployerUser.delete_unconfirmed)
const delete_unconfirmed = async ( id:number ) => {
	await mutate_delete_unconfirmed({
		"employerUserDeleteUnconfirmedId": +id,
		"idEmployer": +route.params.id!
	}).then(async () => {
		await reload()
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

const active_length = computed(() => attendants.value.filter((e: EmployerUserInterface) => e.is_active).length)
</script>