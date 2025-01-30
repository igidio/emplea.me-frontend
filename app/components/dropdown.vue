<template>
	<div class="w-fit">
		<UDropdown
			:items="dropdown_options"
			:popper="{ placement: 'bottom-start' }"
		>
			<button
				class="white text-base rounded-large flex-row gap-1 overflow-hidden w-32 justify-between shadow-sm hidden desktop:flex border"
			>
				<span
					class="text-base font-semibold self-center ml-3 inline-block w-full truncate"
					>{{ first_of_fist_name }}</span
				>

				<img class="h-8 rounded-full border" :src="computed_image.value" alt="Imagen de perfil" />
			</button>

			<button>
				<img
					class="h-8 rounded-full tablet:block desktop:hidden"
					:src="computed_image.value"
					alt="Imagen de perfil"
				/>
			</button>
		</UDropdown>
	</div>
</template>

<script setup lang="ts">
const { dropdown_options, first_of_fist_name } = useUserStore();

const { user, computed_image } = storeToRefs(useUserStore());
</script>
