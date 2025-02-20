<template>

	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Notificaciones',
      to: `/notifications`
		}]"/>

		<NotificationsListElement
			:message="notification.message"
			:goto="notification.goto"
			:title="notification.title"
			:date="last_time(new Date(new Date(notification?.created_at!).getTime() - 6 * 60 * 60 * 1000))"
			v-for="notification in notifications"
		/>
	</div>
</template>

<script setup lang="ts">
import {gqlNotification} from "~/queries";
import type {notification_interface} from "~/interfaces";
import {last_time} from "~/helpers/last_time";

const { notifications } = useNotificationStore();

const { refetch, result, loading } = useQuery<{ notificationByUser: notification_interface[] }>(gqlNotification.by_user)

</script>
