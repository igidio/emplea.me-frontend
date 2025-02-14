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
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

interface Props {
	textPrefix?: string;
}

withDefaults(defineProps<Props>(), {
	textPrefix: "Ingresar con ",
});

interface queriesInterface {
	method: string;
	key: string;
	selection?: string;
}

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
		let queries: queriesInterface = {
			method: "google",
			key: event.data.msg,
		};

		if (useRoute().query.selection)
			queries.selection = useRoute().query.selection?.toString();

		if (event.data.token) {
			useUserStore().set_token(event.data.token);
			useRouter().go(0);
			return;
		}

		if (event.data.msg) {
			useRouter().push({
				path: "/signup",
				query: { ...queries },
			});
		}
	};

	window.addEventListener("message", handleMessage, { once: true });
};
</script>
