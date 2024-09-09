<template>Redirigiendo...</template>

<script>
setTimeout(() => {
	if (import.meta.client) {
		window.opener.postMessage({ msg: "message" }, "*");
		window.close();
	}

	//window.close();
}, 1000);
</script>
