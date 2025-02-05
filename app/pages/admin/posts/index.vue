<template>
	<JobPostTable
		:posts="posts"
		:reload="fetch"
		:loading="loading"
	/>
</template>

<script setup lang="ts">
import type {PostInterface} from "~/interfaces";
import {postFindAll} from "~/queries";

const {result, refetch, loading} = useQuery<{
	"postFindAll": PostInterface[]
}>(postFindAll(true), {}, {prefetch: true})

const posts = ref<PostInterface[]>([])

const fetch = async () => {
	await refetch()?.then((e) => console.log(e))
	posts.value = result.value?.postFindAll || []
}

onMounted(async () => {
	await fetch();
})
</script>
