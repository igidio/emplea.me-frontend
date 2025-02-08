import type {EmployerInterface, EmployerUserInterface,} from "~/interfaces";
import type {PostInterface} from "~/interfaces/server/post.interface";

const employments:Ref<employmentsInterface[]> = ref([])
const index: Ref<undefined | number> = ref(undefined)

interface employmentsInterface {
	id: string;
	name: string;
	role: string;
	image: string;
	employer: EmployerInterface;
	posts: PostInterface[] | []
}

export function useMyEmployments() {
	const { user } = useUserStore()
	const user_id = user.id;

	const selected = computed(() => {
		if (index.value !== undefined) return employments.value[index.value]
		return undefined
	})

	const fill_employments = async ({data, error}: {data:any, error: any}) => {
		if (data && !error.value) employments.value = (data as any).map((e: EmployerUserInterface): employmentsInterface => ({
			image: e.employer.profile_image,
			name: e.employer.name,
			role: e.level,
			id: e.id.toString(),
			employer: e.employer,
			posts: e.post ? e.post : []
		}))
	};

	return { user_id, index, selected, employments, fill_employments };

}