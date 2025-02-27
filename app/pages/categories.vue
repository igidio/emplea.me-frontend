<template>
	<div class="flex flex-col gap-4">
		<UBreadcrumb :links="[{
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/'
		}, {
			label: 'Categorías',
      to: '/categories'
		}
		]"/>
		<hr/>
		<div class="w-full background sticky top-16 z-50">
			<NuxtLink to="/">
				<UButton size="lg" color="black" class="w-full">
					<UIcon name="ri:arrow-left-circle-fill" />
					Volver a inicio
				</UButton>
			</NuxtLink>
		</div>

		<div class="grid grid-cols-1 tablet:grid-cols-4 desktop:grid-cols-6 gap-4">
			<CategoryButton :category="category" v-for="category in categories" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {usePostStore} from "~/stores/post.pinia";

const categories = usePostStore().categories;
</script>
