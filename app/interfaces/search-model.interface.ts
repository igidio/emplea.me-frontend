export interface SearchModelInterface {
	modalities: ModalitiesInterface[];
	location: IdNameRelationInterface | undefined;
	category: IdNameRelationInterface | undefined;
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
