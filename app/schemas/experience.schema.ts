import * as yup from "yup";

export const experience_schema = yup.object().shape({
		title: yup.string().required('Título es requerido'),
		company: yup.string().required('Nombre de la compañía es requerido'),
		description: yup.string().nullable().notRequired(),
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
		starting_year: yup.number()
			.transform((value) => Number.isNaN(value) ? null : value)
			.nullable()
			.notRequired()
			.typeError('Debe ser un número')
			.integer('Debe ser un número entero')
			.min(1900, 'Debe ser mayor a 1900')
			.max(new Date().getFullYear(), `Debe ser menor o igual al año actual`),
		
	})
;