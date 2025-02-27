<template>

	<NuxtLink to="/">
		<div class="w-full mb-4 align flex flex-row justify-center border-b pb-3">
			<Logo :is_admin="true"/>
			<span class="font-black italic text-[16px] align-bottom self-center"
			      v-if="!is_collapsed"
			>EMPLEAME</span>
		</div>
	</NuxtLink>

	<div class="">
		<UButton
			:label="!is_collapsed ? 'Colapsar' : ''"
			class="mb-2"
			color="gray"
			:class="is_collapsed ? 'justify-center' : 'justify-start'"
			block
			:icon="is_collapsed ? 'ri:layout-column-fill' : 'ri:layout-column-line'"
			@click="collapse as any"
		/>
	</div>

	<NuxtLink
		v-for="option in options"
		:to="option.to"
	>
		<UButton
			variant="ghost"
			:label="(!is_collapsed) && option.label || ''"
			:class="is_collapsed ? 'justify-center' : 'justify-start'"
			block
			:icon="option.icon"
		/>

	</NuxtLink>

</template>

<script setup lang="ts">
const {user_role} = storeToRefs(useUserStore())
const is_collapsed = defineModel('is_collapsed')
const collapse = defineModel('collapse')
const options = [
	{
		label: 'Panel',
		to: '/admin',
		icon: 'ri:dashboard-horizontal-line'
	},
	{
		label: 'Usuarios',
		to: '/admin/users',
		icon: 'ri:user-3-line'
	},
	{
		label: 'Empleadores',
		to: '/admin/employers',
		icon: 'ri:briefcase-4-line'
	},
	{
		label: 'Subscripciones',
		to: '/admin/subscriptions',
		icon: 'ri:coins-line'
	},
	...((user_role.value as any === 'SUPERUSER') ? [{
		label: 'Planes',
		to: '/admin/plans',
		icon: 'ri:file-list-3-line'
	}] : []),
	{
		label: 'Publicaciones',
		to: '/admin/posts',
		icon: 'ri:sticky-note-line'
	},
	{
		label: 'Asistentes',
		to: '/admin/attendants',
		icon: 'ri:group-2-line'
	},
]
</script>