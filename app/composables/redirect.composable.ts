const url = ref("new URL");

export function useRedirect() {
	const change_url = () => {
		url.value = "newest URL";
		console.log(url.value);
	};

	return { url, change_url };
}
