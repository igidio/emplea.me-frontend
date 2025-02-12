<template>
	<UModal v-model="show">
		<UCard>
			<template #header><h6>Agregar subscripción</h6></template>
			<div class="flex flex-col gap-2">

				<div class="flex flex-col gap-2">
					<UFormGroup
						name="user"
						label="Usuario empleador"
					>
						<USelectMenu
							color="gray"
							size="md"
							v-model="state.user"
							:loading="loading"
							:searchable="search"
							placeholder="Seleccione."
							option-attribute="full_name"
							trailing
							by="id"
						/>
					</UFormGroup>
				</div>


			</div>
			<template #footer>
				<div class="flex flex-row justify-end">
					<UButton @click="close"
					         label="Cerrar"
					         color="black"
					/>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
import type {PlanInterface, SubscriptionInterface, UserInterface} from "~/interfaces";
import {subscriptionGql} from "~/queries";

const show = defineModel('show', {required: true, type: Boolean})
const close = () => {
	show.value = false
}

const state = reactive({
	user: undefined as UserInterface | undefined,
	plan: undefined as PlanInterface | undefined,
})

const loading = ref(false)

const {mutate} = useMutation<{ subscriptionList: UserInterface[] }>(subscriptionGql.list)

const search = async (q: string) => {
	let values: UserInterface[] = []
	loading.value = true
	await mutate({
		"query": q
	}).then((e) => {
		values = e?.data?.subscriptionList || []
		loading.value = false
	}).catch((e) => {
		console.log(e)
		loading.value = false
	}).finally(() => {
		loading.value = false
	})
	return values.map((e) => ({
		full_name: e.contact.first_name + ' ' + e.contact.last_name,
		id: e.id,
	}))
}

watch(
	() => state.user,
	() => {
		console.log("sadsadsad")
	}
)
</script>