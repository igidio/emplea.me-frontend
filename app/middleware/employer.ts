import type {EmployerInterface, EmployerUserInterface} from "~/interfaces";
import {employerFindOne} from "~/queries";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { user_role, is_premium } = storeToRefs(useUserStore())
	const {
		require_premium,
		levels
	} : {
		require_premium: boolean,
		levels: string[]
	} = to.meta as any
	
	const {result, refetch} = useQuery<{
		findOneEmployer: { employer: EmployerInterface, employerUser: EmployerUserInterface }
	}>(employerFindOne(user_role as any !== 'SEEKER' ? 'not_seeker' : 'default'), {"findOneEmployerId": Number(to.params.id)})
	await refetch()
	
	if (!result.value?.findOneEmployer.employer.id) {
		return navigateTo('/')
	}
	
	if (!result.value?.findOneEmployer.employerUser) {
		return navigateTo('/employer')
	}
	
	if (levels.length > 0 && !levels.includes(result.value?.findOneEmployer.employerUser.level as string)) {
		return navigateTo('/employer')
	}
	
	if (require_premium && !is_premium.value) {
		return navigateTo('/payment')
	}
	
	if (!result.value?.findOneEmployer.employer.is_verified) {
		return navigateTo('/employer')
	}
	
	if (!result.value?.findOneEmployer.employerUser.has_confirm || !result.value?.findOneEmployer.employerUser.is_active) {
		return navigateTo('/employer')
	}
	
	const refetchh = () => {
		console.log("dsadasdsad")
	}
	
	to.meta.employer_data = result.value?.findOneEmployer
	to.meta.refetch = () => refetch()
})