import type {notification_interface} from "~/interfaces";

export const useNotificationStore = defineStore('notification', () => {
	const notifications: Ref<notification_interface[]> = ref([]);
	const limit = ref(4);
	
	const computed_notifications = computed(() => { 	return notifications.value.slice(0, limit.value); });
	
	const initialize = (data: notification_interface[]) => {
		notifications.value = data;
	}
	
	
	return {
		notifications,
		computed_notifications,
		initialize
	}
})