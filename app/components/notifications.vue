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
<!--			<UButton @click="send_message" label="socket"/>-->
			<div class="px-2 pt-3 pb-4">
				<div class="flex flex-col gap-2">
					<div
						v-for="notification in notifications"
						class="hover:bg-gray-100 active:bg-gray-200 p-2 rounded-medium border"
					>
						<b>{{ notification.title }}</b>
						<p>{{ notification.description }}</p>
					</div>
					<div>
						<div
							class="p-4 rounded-medium h-24 items-center center-text flex flex-col gap-2"
							v-if="notifications.length == 0"
						>
							<UIcon name="ri:notification-snooze-line" size="32" class="text-gray-500"/>
							<span class="text-gray-500">No tienes notificaciones</span>
						</div>
					</div>
					<NuxtLink to="/notifications" v-if="notifications.length > 0">
						<UButton block color="black">Ver todas las notificaciones</UButton>
					</NuxtLink>
				</div>
			</div>
		</template>
	</UPopover>
</template>

<script setup lang="ts">
const {$socket} = useNuxtApp();

const notifications = [
	// {
	// 	title: "New message",
	// 	description: "You have a new message from John Doe",
	// },
	// {
	// 	title: "New message",
	// 	description: "You have a new message from John Doe",
	// },
	// {
	// 	title: "New message",
	// 	description: "You have a new message from John Doe",
	// },
	// {
	// 	title: "New message",
	// 	description: "You have a new message from John Doe",
	// },
	// {
	// 	title: "New message",
	// 	description: "You have a new message from John Doe",
	// },
];

const send_message = () => {
	$socket.emit('message', {text: '¡Hola desde Nuxt 3!'});
	if (import.meta.client) {
		$socket.on('update', (data) => {
			console.log(data);
			useToast().add({title: data});
		});
	}

};
</script>
