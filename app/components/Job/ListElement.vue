<template>
	<div
		class="outline-2 outline-dashed outline-violet-600 flex flex-col p-4 rounded-large gap-4 text-ellipsis overflow-hidden"
	>
		<div class="flex tablet:flex-row flex-col justify-between gap-4">
			<div class="flex flex-row gap-4">
				<img src="https://placehold.co/400" class="w-16 rounded-small" />
				<div class="flex flex-col">
					<h4>Job title</h4>
					<span class="font-semibold">Employer Name</span>
				</div>
			</div>
			<div class="flex flex-col">
				<UButton size="md" :to="'jobs/' + 1">Más detalles</UButton>
			</div>
		</div>

		<div class="line-clamp-3 tablet:line-clamp-2">
			<p class="">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
				lacinia est. Nunc at sodales ex, eu ultrices nisi. Fusce ac ultrices
				nisi. Curabitur vestibulum ac est sit amet congue. Fusce quis sapien in
				ante dictum tincidunt. Nam sit amet.
			</p>
		</div>
	</div>
</template>
