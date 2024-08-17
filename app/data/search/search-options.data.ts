import type { CategoryInterface } from "~/interfaces/category.interface";

interface searchOptions {
	categories: CategoryInterface[];
	locations: { id: number; name: string }[];
}

export default {
	categories: [
		{
			id: 1,
			name: "Categoría 1",
			icon: "ri:cake-3-fill",
		},
		{
			id: 2,
			name: "Categoría 2",
			icon: "ri:bit-coin-fill",
		},
		{
			id: 3,
			name: "Categoría 3",
			icon: "ri:car-line",
		},
		{
			id: 4,
			name: "Categoría 4",
			icon: "ri:ancient-gate-line",
		},
		{
			id: 5,
			name: "Categoría 5",
			icon: "ri:car-washing-line",
		},
		{
			id: 6,
			name: "Categoría 6",
			icon: "ri:cloud-line",
		},
		{
			id: 7,
			name: "Categoría 7",
			icon: "ri:cup-line",
		},
		{
			id: 8,
			name: "Categoría 8",
			icon: "ri:discount-percent-line",
		},
		{
			id: 9,
			name: "Categoría 9",
			icon: "ri:contacts-book-2-line",
		},
		{
			id: 10,
			name: "Categoría 10",
			icon: "ri:file-text-line",
		},
	],
	locations: [
		{
			id: 1,
			name: "Departamento 1 - Provincia 1 - Municipio 1",
		},
		{
			id: 2,
			name: "Departamento 1 - Provincia 1 - Municipio 2",
		},
		{
			id: 3,
			name: "Departamento 1 - Provincia 1 - Municipio 3",
		},
		{
			id: 4,
			name: "Departamento 1 - Provincia 2 - Municipio 4",
		},
		{
			id: 5,
			name: "Departamento 1 - Provincia 2 - Municipio 5",
		},
		{
			id: 6,
			name: "Departamento 2 - Provincia 3 - Municipio 6",
		},
		{
			id: 7,
			name: "Departamento 2 - Provincia 3 - Municipio 7",
		},
		{
			id: 8,
			name: "Departamento 2 - Provincia 3 - Municipio 8",
		},
	],
} satisfies searchOptions;
