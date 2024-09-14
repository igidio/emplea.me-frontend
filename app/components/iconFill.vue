<template>
	<div
		class="bg-violet-600 aspect-[1/1] h-fit flex items-center justify-center p-[3px]"
		:class="`${rounded} ${size_computed.parent}`"
	>
		<UIcon :name="name" class="bg-white z-0" :class="size_computed.child" />
	</div>
</template>

<script setup lang="ts">
interface Props {
	name: string;
	rounded?: string;
	small?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	rounded: "rounded-small",
	small: false,
});

const size_computed = computed(() => {
	return props.small
		? {
				parent: "p-[3px]",
				child: "h-3 w-3",
		  }
		: { parent: "p-[4px]", child: "h-5 w-6" };
});
</script>
