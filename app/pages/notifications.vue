<template>
	<h2>Notificaciones</h2>
	<div class="flex flex-col gap-4">
		<NotificationsListElement
			:title="notification.title"
			:description="notification.description"
			:goto="notification.goto"
			v-for="notification in notifications"
		/>
	</div>
</template>

<script setup lang="ts">
const notifications = [
	{
		id: 1,
		title: "Nueva publicación",
		description: "Un nuevo post ha sido publicado en la sección de noticias.",
		createdAt: new Date("2022-01-01T12:00:00"),
		isRead: false,
		goto: "/jobs",
	},
	{
		id: 2,
		title: "Actualización de contenido",
		description: "Se ha realizado una actualización en el sitio web.",
		createdAt: new Date("2022-01-02T14:30:00"),
		isRead: true,
		goto: "/jobs",
	},
	{
		id: 3,
		title: "Nueva publicación",
		description: "Un nuevo post ha sido publicado en la sección de noticias.",
		createdAt: new Date("2022-01-03T09:45:00"),
		isRead: false,
		goto: "/jobs",
	},
	{
		id: 4,
		title: "Actualización de contenido",
		description: "Se ha realizado una actualización en el sitio web.",
		createdAt: new Date("2022-01-04T11:15:00"),
		isRead: true,
		goto: "/jobs",
	},
];
</script>
