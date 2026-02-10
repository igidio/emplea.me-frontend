import {io} from 'socket.io-client'

export default defineNuxtPlugin(() => {
	const {user} = storeToRefs(useUserStore())
	const { notifications } = storeToRefs(useNotificationStore())
	
	let autoConnect = false
	if (user.value.id) autoConnect = true
	
	if (import.meta.client) {
		const socket = io(useRuntimeConfig().public.server_host, {
			autoConnect,
			query: {
				userId: user.value.id ? (user.value.id).toString() : null
			}
		})
		
			socket.on('update', (data) => {
				notifications.value.unshift(data);
				useToast().add({title: data.title, description: data.message});
				if (data.goto === '/') {
					if (import.meta.client) window.location.replace('/');
				}
			});
			
		if (['ADMIN', 'SUPERUSER'].includes(user.value.role)) {
			socket.emit('joinRoom', 'admin');
			socket.emit('sendMessage', {room: 'admin', message: "asdsadsadas"});
		}
		
		return {
			provide: {
				socket
			}
		}
	}
});