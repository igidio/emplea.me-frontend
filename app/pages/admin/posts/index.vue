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

onMounted(async () => await fetch())

const posts = ref<PostInterface[]>([])
posts.value = result.value?.postFindAll || []

const fetch = async () => {
	await refetch()
}
</script>
