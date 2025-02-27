import type {PostInterface} from "~/interfaces";
import {postFindOne} from "~/queries";
import type {postInfoInterface} from "~/interfaces/post_info.interface";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const {user_role} = storeToRefs(useUserStore())
	const {
		require_modify
	}: {
		require_modify: boolean
	} = to.meta as any
	
	try {
		const {result, refetch} = useQuery<{
			post: postInfoInterface
		}>(postFindOne(true), {"id": Number(to.params.id)});
		await refetch();
		
		
		if (result.value?.post.post.has_disabled && !['ADMIN', 'SUPERUSER'].includes(user_role.value)) {
			return navigateTo(`/employer/${result.value.post.post.employer.id}`)
		}
		
		if (require_modify && result.value?.post.info.can_modify === false) {
			return navigateTo('/jobs/' + to.params.id)
		}
		
		to.meta.post_data = result.value?.post;
		to.meta.refetch = () => refetch()
	} catch (e) {
		return navigateTo('/')
	}
	
})