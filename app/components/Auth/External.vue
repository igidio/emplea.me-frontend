<template>
	<UButton
		color="primary"
		class="grow"
		icon="ri:google-fill"
		@click="signInWithGoogle"
	>
		{{ textPrefix }} Google
	</UButton>
	<UButton color="primary" class="grow" icon="ri:linkedin-fill">
		{{ textPrefix }} LinkedIn
	</UButton>
	{{ `${config.public.server_host}${config.public.google_callback}` }}
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const router = useRouter();

interface Props {
	textPrefix?: string;
}

withDefaults(defineProps<Props>(), {
	textPrefix: "Ingresar con ",
});

const signInWithGoogle = () => {
	const googleAuthUrl = `${config.public.server_host}${config.public.google_callback}`;
	const width = 500;
	const height = 600;
	const left = window.screen.width / 2 - width / 2;
	const top = window.screen.height / 2 - height / 2;

	window.open(
		googleAuthUrl,
		"GoogleAuth",
		`width=${width},height=${height},top=${top},left=${left}`
	);

	let handleMessage = (event: MessageEvent) => {
		if (event.data.msg) {
			router.push({
				path: "/signup",
				query: {
					method: "google",
					key: event.data.msg,
				},
			});
		}
	};

	window.addEventListener("message", handleMessage, { once: true });
};
</script>
