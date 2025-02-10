<template>
	<UTable
		:columns="columns"
		:rows="rows"
	>

		<template #level-data="{row}">
			<div class="items-center flex flex-row gap-1">
				<UIcon
					name="ri:user-2-fill"
					size="12"
					:class="{
						'bg-yellow-600': row.level === 'ADMIN' && row.is_first_user,
						'bg-blue-600': row.level === 'ADMIN',
						'bg-green-600': row.level === 'ATTENDANT',
					}"
				/>
				<span>
				{{ EmployerLevelEnum[row.level as unknown as keyof typeof EmployerLevelEnum] }}
				<span v-if="row.is_first_user">(Primer usuario)</span>
			</span>
			</div>
		</template>
		<template #status-data="{row}">
			<UBadge
				:color="row.status.color"
				variant="soft"
				:label="row.status.label"
			/>
		</template>
		<template #options-data="{row}">
			<UDropdown :items="options(row)" :ui="{
						width: 'w-48'
					}">
				<UButton color="gray" variant="ghost" icon="ri:more-fill"/>
			</UDropdown>
		</template>
	</UTable>


</template>

<script setup lang="ts">
import type {TableColumn} from "#ui/types";
import type {EmployerUserInterface} from "~/interfaces";
import {EmployerLevelEnum} from "~/enums";

const props = defineProps<{
	attendants: EmployerUserInterface[],
	options: (row: any) => any[]
}>()

const columns: TableColumn[] = [
	{label: 'Nombres y apellidos', key: 'full_name'},
	{label: 'Nivel', key: 'level'},
	{label: 'Estado', key: 'status'},
	{label: 'Opciones', key: 'options'},
]

const rows = computed(() => {
	return props.attendants.map((e: EmployerUserInterface) => ({
		id: e.id,
		level: e.level,
		is_first_user: e.is_first_user,
		full_name: `${e.user.contact.first_name} ${e.user.contact.last_name}`,
		status:
			(e.has_confirm && e.is_active) ? {label: 'Activo', color: 'green'}
				: (!e.has_confirm && e.is_active) ? {label: 'Pendiente', color: 'orange'}
					: {label: 'Inactivo', color: 'red'},
	}))
})
</script>
