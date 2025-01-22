import * as yup from "yup";

export const seeker_skill_schema = yup.object({
	skill: yup.object().required('La habilidad es requerida').nonNullable('La habilidad no puede ser nula'),
	//level: yup.string()or,
})