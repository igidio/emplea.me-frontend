<template>
	<div class="flex flex-row gap-4 items-center">
		<NuxtLink to="/">
			<Logo/>
		</NuxtLink>

		<div class="flex flex-row h-fit gap-2">
			<NuxtLink v-for="option in computed_navigation_options" :to="{ name: option.name }">
				<UButton

						:variant="!option.is_gold ? 'ghost' : undefined"
						:color="option.is_gold ? 'gold' : undefined"

				>{{ option.label }}
				</UButton
				>
			</NuxtLink>

		</div>
	</div>

	<div class="flex flex-row gap-4">
		<Notifications/>

		<UButton
				variant="ghost"
				class="block tablet:hidden"
				icon="ri:menu-fill"
				@click="is_open = true"
		/>

		<Dropdown/>
	</div>
</template>

<script setup lang="ts">
const {computed_navigation_options} = useUserStore();

const is_open = ref(false);

const is_premium = ref(true);
</script>
