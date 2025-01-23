import * as yup from "yup";

export const education_schema = yup.object({
	institute: yup.object().required('La institución es requerida').nonNullable('La institución no puede ser nula'),
	title: yup.string().required('El título es requerido').max(60, 'La cantidad máxima de caracteres es de 100'),
	degree: yup.string().required('El grado es requerido'),
	subtitle: yup.string()
		.max(60, 'La cantidad máxima de caracteres es de 60').notRequired(),
	starting_year: yup.number()
		.transform((value) => Number.isNaN(value) ? null : value)
		.nullable()
		.notRequired()
		.typeError('Debe ser un número')
		.integer('Debe ser un número entero')
		.min(1900, 'Debe ser mayor a 1900')
		.max(new Date().getFullYear(), `Debe ser menor o igual al año actual`)
	,
	completion_year: yup.number()
		.transform((value) => Number.isNaN(value) ? null : value)
		.nullable()
		.notRequired()
		.typeError('Debe ser un número')
		.integer('Debe ser un número entero')
		.min(1900, 'Debe ser mayor a 1900')
		.max(new Date().getFullYear(), `Debe ser menor o igual al año actual`)
		.test({
			name: 'is-greater',
			message: 'Debe ser mayor o igual al año de inicio',
			test: function (completion_year) {
				const {starting_year} = this.parent;
				if (!starting_year || !completion_year) return true;
				return completion_year >= starting_year;
			}
		}),
});