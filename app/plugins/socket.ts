import {io} from 'socket.io-client'

export default defineNuxtPlugin(() => {
	const {user} = storeToRefs(useUserStore())
	
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
				useToast().add({title: data.message});
			});
			
		if (['ADMIN', 'SUPERUSER'].includes(user.value.role)) {
			socket.emit('joinRoom', 'admin');
			socket.on('chatMessage', (message) => {
				console.log('Nuevo mensaje:', message);
			});
			socket.emit('sendMessage', {room: 'admin', message: "asdsadsadas"});
		}
		// if (['ADMIN', 'SUPERUSER'].includes(user.value.role)) {
		// 	io.on('connection', (socket) => {
		// 		console.log("sadasdsadsadsadsadsad")
		// 		socket.join('room1')
		// 		socket.to('room1').emit('update', { message: 'Hello, room1' })
		// 	})
		// }
		
		
		return {
			provide: {
				socket
			}
		}
	}
});