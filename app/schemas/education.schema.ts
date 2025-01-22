import * as yup from "yup";

export const education_schema = yup.object({
	institute: yup.object().required('La institución es requerida').nonNullable('La institución no puede ser nula'),
	subtitle: yup.string()
		.max(60, 'La cantidad máxima de caracteres es de 60'),
	starting_year: yup.number()
		.transform((value) => Number.isNaN(value) ? null : value )
		.nullable()
		.notRequired()
		.typeError('Debe ser un número')
		.integer('Debe ser un número entero')
		.min(1900, 'Debe ser mayor a 1900')
		.max(new Date().getFullYear(), `Debe ser menor o igual al año actual`)
	,
	completion_year: yup.number()
		.transform((value) => Number.isNaN(value) ? null : value )
		.nullable()
		.notRequired()
		.typeError('Debe ser un número')
		.integer('Debe ser un número entero')
		.min(1900, 'Debe ser mayor a 1900')
		.max(new Date().getFullYear(), `Debe ser menor o igual al año actual`)
		.when('starting_year', (starting_year, schema) =>
			starting_year ? schema.min(starting_year as any, 'Debe ser mayor o igual al año de inicio') : schema
		)
});