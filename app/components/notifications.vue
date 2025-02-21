<template>
	<!-- <UDropdown
		:items="items"
		:popper="{ placement: 'auto-end' }"
		:ui="{ width: 'w-48' }"
	>
	</UDropdown> -->

	<UPopover
		:popper="{ placement: 'auto-end' }"
		v-model:open="is_open"
	>
		<UChip size="md" color="green" :show="has_unread" inset>
			<UButton
				variant="ghost"
				icon="ri:notification-3-fill"
				class="text-violet-600"
				@click="mark_as_read()"
			/>
		</UChip>
		<template #panel>
			<!--			<UButton @click="send_message" label="socket"/>-->
			<div class="px-2 pt-3 pb-4 w-64">
				<div class="flex flex-col gap-2">
					<div
						v-for="notification in computed_notifications"
						class="hover:bg-gray-100 active:bg-gray-200 p-2 rounded-medium border flex flex-col gap-2 cursor-pointer"
						@click="() => {
							notification.goto ? $router.push(notification.goto) : null;
							is_open = false;
						}"
					>
						<UBadge
							v-if="notification.goto"
							variant="soft"
							size="xs"
							class="w-fit"
						>
							<UIcon name="ri:link" class="mr-1"/>
							<span class="text-xs">{{ notification.goto }}</span></UBadge>
						<div class="flex flex-col gap-1">
							<span class="text-sm font-semibold">{{ notification.title }}</span>
							<p class="text-sm">{{ notification.message }}</p>
							<span class="text-xs text-gray-500">{{
									last_time(new Date(new Date(notification?.created_at!).getTime() - 6 * 60 * 60 * 1000))
								}}</span>
						</div>
					</div>
					<div>
						<div
							class="p-4 rounded-medium h-24 items-center center-text flex flex-col gap-2"
							v-if="computed_notifications.length == 0"
						>
							<UIcon name="ri:notification-snooze-line" size="32" class="text-gray-500"/>
							<span class="text-gray-500">No tienes notificaciones</span>
						</div>
					</div>
					<NuxtLink to="/notifications" v-if="computed_notifications.length > 0">
						<UButton block variant="ghost" @click="is_open = false">Ver todas</UButton>
					</NuxtLink>
				</div>
			</div>
		</template>
	</UPopover>
</template>

<script setup lang="ts">
import {useNotificationStore} from "~/stores/notifications.pinia";
import {last_time} from "~/helpers/last_time";
import {gqlNotification} from "~/queries";

const is_open: Ref<undefined | boolean> = ref(undefined);
const {mark_all_as_read} = useNotificationStore();
const { computed_notifications, has_unread } = storeToRefs(useNotificationStore());

const { mutate } = useMutation(gqlNotification.by_user_and_check)


const mark_as_read = async() => {
	await mutate()
	mark_all_as_read()
};


// const send_message = () => {
// 	$socket.emit('message', {text: '¡Hola desde Nuxt 3!'});
// 	if (import.meta.client) {
// 		$socket.on('update', (data) => {
// 			console.log(data);
// 			useToast().add({title: data});
// 		});
// 	}
// };
</script>
