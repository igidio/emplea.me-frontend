export interface SearchModelInterface {
	modalities: ModalitiesInterface[];
	category: IdNameRelationInterface | undefined;
	department: IdNameRelationInterface | undefined;
	province: IdNameRelationInterface | undefined;
	searchQuery: string | undefined;
	isOpen: boolean;
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
	department: string | undefined;
	province: string | undefined;
}
