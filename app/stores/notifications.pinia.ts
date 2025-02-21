import type {notification_interface} from "~/interfaces";

export const useNotificationStore = defineStore('notification', () => {
	const notifications: Ref<notification_interface[]> = ref([]);
	const limit = ref(4);
	
	const computed_notifications = computed(() => { 	return notifications.value.slice(0, limit.value); });
	
	const initialize = (data: notification_interface[]) => {
		notifications.value = data;
	}
	
	const has_unread = computed(() => {
		return !!computed_notifications.value.filter((notification) => !notification.was_read).length
	});
	
	const mark_all_as_read = () => {
		console.log(notifications.value)
		return notifications.value.forEach((notification) => notification.was_read = true);
	}
	
	const add_notifications = (data: notification_interface[]) => {
		notifications.value = [...data, ...toRaw(notifications.value)];
	}
	
	return {
		notifications,
		computed_notifications,
		initialize,
		has_unread,
		mark_all_as_read,
		add_notifications
	}
})