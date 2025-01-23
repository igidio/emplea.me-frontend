<template>
	<h6>Locación</h6>
	<div
		class="flex flex-col gap-4 place-content-between p-4 rounded-medium dotted w-full"
	>
		<USelectMenu
			clear-search-on-close
			placeholder="Seleccione"
			searchable
			searchable-placeholder="Buscar"
			v-model="state"
			:options="postStore.location_options"
			option-attribute="name"
			size="md"
			color="gray"
		>
		</USelectMenu>

		<span class="error" v-if="error">{{error.message}}</span>
		<div class="flex flex-row place-content-between">
			<span class="inline-flex place-items-center" v-if="location">Locación actual: {{
					`${location?.department}, ${location?.municipality}, ${location?.province}`
				}}</span>
			<UButton @click="update" label="Confirmar" :disabled="loading"/>
		</div>
	</div>


</template>

<script setup lang="ts">
import type {LocationInterface} from "~/interfaces";
import {seekerChangeLocation} from "~/queries";

interface Props {
	readonly reload: () => Promise<void>,
	location?: LocationInterface
}

const p = defineProps<Props>()

const postStore = usePostStore();

const state = ref(p.location ? postStore.location_options.find((e) => {
	if (e.id === p.location?.id) return e
}) : undefined);

const {mutate, loading, error} = useMutation<{ seekerChangeLocation: string }>(seekerChangeLocation);

const update = () => {
	mutate({
		"seekerChangeLocationId": Number(state.value?.id)
	}).then(() => {
		p.reload()
		useToast().add({title: 'Locación actualizada'})
	});
}
</script>