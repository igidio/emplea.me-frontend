const url = ref("new URL");

export function useRedirect() {
	const change_url = () => {
		url.value = "newest URL";
	};

	return { url, change_url };
}
