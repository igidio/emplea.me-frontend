<template>
	<!-- <UDropdown
		:items="items"
		:popper="{ placement: 'auto-end' }"
		:ui="{ width: 'w-48' }"
	>
	</UDropdown> -->

	<UPopover :popper="{ placement: 'auto-end' }">
		<UButton
			variant="ghost"
			icon="ri:notification-3-fill"
			class="text-violet-600"
		></UButton>

		<template #panel>
			<div class="px-2 pt-3 pb-4">
				<div class="flex flex-col gap-2">
					<div
						v-for="notification in notifications"
						class="hover:bg-gray-100 active:bg-gray-200 p-2 rounded-medium"
					>
						<b>{{ notification.title }}</b>
						<p>{{ notification.description }}</p>
					</div>
					<NuxtLink to="/notifications">
						<UButton block color="black">Ver todas las notificaciones</UButton>
					</NuxtLink>
				</div>
			</div>
		</template>
	</UPopover>
</template>

<script setup lang="ts">
const notifications = [
	{
		title: "New message",
		description: "You have a new message from John Doe",
	},
	{
		title: "New message",
		description: "You have a new message from John Doe",
	},
	{
		title: "New message",
		description: "You have a new message from John Doe",
	},
	{
		title: "New message",
		description: "You have a new message from John Doe",
	},
	{
		title: "New message",
		description: "You have a new message from John Doe",
	},
];
</script>
