<template>
	<div
		class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full"
	>
		<div class="flex flex-row gap-4">
			<IconFill :name="props.social.icon"/>
			<div class="flex flex-col">
				<span class="text-sm">{{ props.social?.name }}</span>
				<span>{{ `${props.name} - @${props.identifier}` }}</span>
			</div>
		</div>

		<div class="flex flex-row gap-2 h-fit">
			<UButton color="black" label="Editar"/>
			<UButton color="red" label="Eliminar"/>
		</div>

	</div>

	<div class="flex flex-row gap-4 place-content-between border-primary p-4 rounded-medium dotted w-full">
		<UFormGroup label="Nombre de usuario">
			<UInput color="gray" placeholder="@nombre de usuario"/>
		</UFormGroup>
		<UFormGroup label="Red social">
			<USelect color="gray"/>
		</UFormGroup>

	</div>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	identifier: string;
	social: {
		name: string;
		icon: string;
	};
}
defineProps<{ props: Props }>();
</script>