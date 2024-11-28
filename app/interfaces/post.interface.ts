export interface PostInterface {
	id: number;
	name: string;
	description: string;
	employer: EmployerInterface;
}

export interface EmployerInterface {
	name: string;
	profile_image: string;
}
