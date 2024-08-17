interface searchOptions {
	categories: { id: number; name: string }[];
	locations: { id: number; name: string }[];
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
