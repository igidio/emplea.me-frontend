export interface SearchModelInterface {
	modalities: ModalitiesInterface[];
	location: IdNameRelationInterface | undefined;
	category: categoryInterface | undefined;
	searchQuery: string | undefined;
}

export interface ModalitiesInterface {
	id: number;
	name: string;
	active: boolean;
}

export interface IdNameRelationInterface {
	id: number;
	name: string;
}

export interface TitleInterface {
	category: string | undefined;
	location: string | undefined;
}

export interface categoryInterface {
	id: number;
	name: string;
	icon: string;
}
[];
