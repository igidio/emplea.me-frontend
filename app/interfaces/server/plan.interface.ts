export interface PlanInterface {
	id?: number;
	name: string;
	duration: number;
	max_featured: number;
	price: number;
	benefits: string;
	color?: string;
	active: boolean;
	created_at?: Date;
	modified_at?: Date;
}