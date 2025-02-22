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
		<h3>Notificaciones</h3>

		<NotificationsListElement
			:message="notification.message"
			:goto="notification.goto"
			:title="notification.title"
			:date="last_time(new Date(new Date(notification?.created_at!).getTime() - 6 * 60 * 60 * 1000))"
			v-for="notification in notifications"
			:clear="() => delete_one(notification.id!)"
			:key="notification.id"
		/>

		<span
			v-if="notifications.length == 0"
			class="text-slate-500 bg-slate-100 p-4 rounded-medium text-center"
		>No hay ninguna notificación actualmente.</span>

		<UButton @click="load_more(notifications.length,4)" label="Cargar más" block v-if="!is_locked && !(notifications.length == 0 || notifications.length < 4)" :loading="loading"/>
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
	middleware: ['role'],
	keepalive: false
})

useHead({
	title: 'Notificaciones'
})

const {mutate} = useMutation(gqlNotification.by_user_and_check)
const {refetch, loading, result, load} = useLazyQuery<{ notificationByUser: notification_interface[] }>(gqlNotification.by_user)

const notifications = ref<notification_interface[]>([])

onMounted(async () => {
	await mutate();
	await load()
	notifications.value = result.value?.notificationByUser!
})

const is_locked = ref(false)
const offset:Ref<number> = ref(0)

const load_more = async (offset_inc: number = 0, limit: number = 0) => {
	await refetch({
		limit,
		offset: offset_inc
	} as any)?.then(async (e) => {
		notifications.value = [...notifications.value, ...e.data?.notificationByUser]
		if (e.data?.notificationByUser.length == 0) {
			is_locked.value = true
		}
	})

}

const { mutate: clear_mutate, loading: clear_loading } = useMutation<{ notificationByUserAndClear: string }>(gqlNotification.by_user_and_clear)

const delete_one = async (id: number): Promise<void> => {
	await clear_mutate({
		"idNotification": +id
	}).then(async (e) => {
		await load_more(notifications.value.length, 1)
		useToast().add({ title: e?.data?.notificationByUserAndClear })
		notifications.value = notifications.value.filter(e => e.id != id)
	})
}
</script>
