<template>
	<div class="w-fit">
		<UDropdown
			:items="dropdown_options"
			:popper="{ placement: 'bottom-start' }"
		>
			<button
				class="white text-base rounded-large flex flex-row gap-1 overflow-hidden w-32 justify-between shadow-sm"
			>
				<span
					class="text-base font-semibold self-center ml-3 inline-block w-full truncate"
					>{{ first_of_fist_name }}</span
				>

				<img
					class="h-8 rounded-full"
					src="https://avatars.githubusercontent.com/u/739984?v=4"
				/>
			</button>
		</UDropdown>
	</div>
</template>

<script setup lang="ts">
const { dropdown_options, first_of_fist_name } = useUserStore();
</script>
