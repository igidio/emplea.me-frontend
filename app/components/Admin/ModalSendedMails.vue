<template>
	<UModal v-model="is_open">
		<UCard>
			<template #header>Invitaciones por correo activas</template>
			<div class="flex flex-col gap-4">
				<UTable
					:rows="confirmations"
					:columns="columns"
					:loading="loading"
				>
					<template #is_valid-data="{row}">
						<UButton
							label="Invalidar"
						  @click="invalidate(row.id)"
						/>
					</template>
				</UTable>
			</div>
			<template #footer>
				<div class="flex flex-row gap-2 w-full justify-end">
					<UButton
						color="black"
						@click="() => {is_open = false;}"
					>
						Cerrar
					</UButton>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {ModelRef} from "vue";
import {gqlConfirmation} from "~/queries";
import type {TableColumn} from "#ui/types";
import {last_time} from "~/helpers/last_time";

const is_open: ModelRef<boolean> = defineModel('is_open', {required: true, type: Boolean});

const {result, refetch, loading} = useQuery<{ confirmationGetAllAdminInvitations: any }>(gqlConfirmation.get_all_admin_invitations)

const confirmations = computed(() => (result.value?.confirmationGetAllAdminInvitations && result.value?.confirmationGetAllAdminInvitations.length > 0) ?
	result.value?.confirmationGetAllAdminInvitations.map((e: any) => ({
		id: e.id,
		index: 'Invitación ' + e.id,
		created_at: last_time(new Date(new Date(e.created_at!).getTime() - 6 * 60 * 60 * 1000)),
		was_read: e.was_read,
	})) : [])

const columns: TableColumn[] = [
	{
		label: "Índice",
		key: "index",
	},
	{
		label: "Creado",
		key: "created_at"
	},
	{
		label: "Opciones",
		key: "is_valid"
	}
]

watch(is_open, async (e) => {
	if (e) await refetch();
})

const { mutate } = useMutation(gqlConfirmation.read)
const invalidate = async (id: number) => {
	await mutate({
		"confirmationReadOneId": +id
	}).then(() => {
		useToast().add({
			title: 'Invitación invalidada',
			description: `La invitación ha sido invalidada correctamente.`,
		})
		is_open.value = false;
	})
}
</script>