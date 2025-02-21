import {subscriptionUserDetails} from "~/queries";
import type {employer_info_interface} from "~/interfaces";

export default defineNuxtPlugin(async () => {
	const {user_role, set_employer_info} = useUserStore()
	if (user_role === undefined || user_role as any != 'EMPLOYER') return

	const {data} = await useAsyncQuery<{ "subscriptionUserDetails": employer_info_interface }>(subscriptionUserDetails)
	set_employer_info(data.value!.subscriptionUserDetails)
})