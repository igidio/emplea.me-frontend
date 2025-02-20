import {io} from 'socket.io-client'

export default defineNuxtPlugin(() => {
	const { user } = storeToRefs(useUserStore())
	
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
			console.log(data);
			//notifications.push(data);
			useToast().add({ title: data.message });
		});
		
		return {
			provide: {
				socket
			}
		}
	}
});