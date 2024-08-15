interface searchOptions {
	categories: { id: number; name: string }[];
	departments: { id: number; name: string }[];
	provinces: { id: number; name: string }[];
}

export default {
	categories: [
		{
			id: 1,
			name: "Categoría 1",
		},
		{
			id: 2,
			name: "Categoría 2",
		},
		{
			id: 3,
			name: "Categoría 3",
		},
	],
	departments: [
		{
			id: 1,
			name: "Departamento 1",
		},
		{
			id: 3,
			name: "Departamento 3",
		},
		{
			id: 2,
			name: "Departamento 2",
		},
	],
	provinces: [
		{
			id: 1,
			name: "Provincia 1",
		},
		{
			id: 2,
			name: "Provincia 2",
		},
		{
			id: 3,
			name: "Provincia 3",
		},
	],
} satisfies searchOptions;
