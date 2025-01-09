<template>
	<ModalLogin v-model:is_open="is_open_modal_login"/>
	<div>
		<UNotifications />
		<NuxtLayout :name="(['ADMIN', 'SUPERUSER'].includes(userStore.user_role)) ? 'admin' : 'main'">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/user.pinia";
import {usePostStore} from "~/stores/post.pinia";
import {categoryGet, getUserByToken, locationGet} from "~/queries";
import {AdminRolesEnum} from "~/enums/server/roles.enum";

useHead({
  title: 'Bienvenidos a Empleame',
  meta: [
    { name: 'google-adsense-account', content: 'ca-pub-6257864254238276' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})

const { is_open_modal_login } = storeToRefs(useUserStore())

const userStore = useUserStore();
const postStore = usePostStore();

const {getToken} = useApollo();

getToken();
const {data, error, status} = await useAsyncQuery(getUserByToken, {
	server: true,
});

if (data && !error.value)
	userStore.set_user((data.value as any).getUserByToken);

// Categorías
const get_categories = async() => {
	const {data} = await useAsyncQuery(categoryGet, {server: true});
	postStore.set_categories((data.value as any).allCategories);
}
const get_locations = async () => {
	const {data} = await useAsyncQuery(locationGet, {server: true});
	postStore.set_locations((data.value as any).allLocations);
}

get_categories()
get_locations()
</script>
