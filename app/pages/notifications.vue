<template>
	<div class="flex flex-col gap-4" v-if="result?.notificationByUser">
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

		<UButton @click="load_more" label="Cargar más" block v-if="!is_locked" :loading="loading"/>
		<div class="text-slate-500 bg-slate-100 p-4 rounded-medium text-center" v-if="is_locked">Fin de los
			resultados
		</div>
	</div>
</template>

<script setup lang="ts">
import {gqlNotification} from "~/queries";
import type {notification_interface} from "~/interfaces";
import {last_time} from "~/helpers/last_time";

definePageMeta({
	middleware: ['role']
})

useHead({
	title: 'Notificaciones'
})

const {mutate} = useMutation(gqlNotification.by_user_and_check)
const {refetch, loading, result, load} = useLazyQuery<{ notificationByUser: notification_interface[] }>(gqlNotification.by_user)

const notifications = ref<notification_interface[]>([])



const offset = ref(0)

onMounted(async () => {
	await mutate();
	await load()
	notifications.value = result.value?.notificationByUser!
})

const is_locked = ref(false)

const load_more = () => {
	offset.value += 4
	refetch({
		limit: 4,
		offset: offset.value
	} as any)?.then(async (e) => {
		notifications.value = [...notifications.value, ...e.data?.notificationByUser]
		if (e.data?.notificationByUser.length == 0 || e.data?.notificationByUser.length < 4) {
			is_locked.value = true
		}
	})
}
</script>
