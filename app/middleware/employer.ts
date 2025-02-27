import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const {user_role, is_premium} = storeToRefs(useUserStore())
	const {
		require_premium,
		levels,
		require_employer_user = true
	}: {
		require_premium: boolean,
		levels: string[],
		require_employer_user?: boolean
	} = to.meta as any
	
	try {
		
		const {result, refetch} = useQuery<{
			findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
		}>(employerFindOne(user_role as any !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(to.params.id)})
		await refetch()
		
		if (!result.value?.findOneEmployer.employer.id) {
			return navigateTo('/')
		}
		
		if (require_employer_user && !result.value?.findOneEmployer.employerUser) {
			return navigateTo('/employer')
		}

		if (require_employer_user && (levels.length > 0 && !levels.includes(result.value?.findOneEmployer.employerUser.level as string))) {
			return navigateTo('/employer')
		}

		if (require_premium && !is_premium.value) {
			return navigateTo('/payment')
		}

		if (!result.value?.findOneEmployer.employer.is_verified) {
			return navigateTo('/employer')
		}

		if (require_employer_user && (!result.value?.findOneEmployer.employerUser.has_confirm || !result.value?.findOneEmployer.employerUser.is_active)) {
			return navigateTo('/employer')
		}
		
		to.meta.employer_data = result.value?.findOneEmployer
		to.meta.refetch = () => refetch()
	} catch (e) {
		return navigateTo('/')
	}
})