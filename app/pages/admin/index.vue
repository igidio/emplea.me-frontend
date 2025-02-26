<template>
	Esta es la página de inicio

	{{ data }}
</template>

<script setup lang="ts">
import {gqlAdmin} from "~/queries";
import type {admin_interface} from "~/interfaces/server/admin.interface";

const { data } = useAsyncQuery<{ admin: admin_interface }>(gqlAdmin.admin)
</script>