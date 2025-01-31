import * as yup from "yup";

export const employer_schema = yup.object({
	name: yup
		.string()
		.required("El nombre es obligatorio")
		.min(3, "El nombre debe tener al menos 3 caracteres")
		.max(40, "El nombre debe tener como mucho 100 caracteres"),
	email: yup
		.string()
		.email("El correo electrónico debe ser válido")
		.required("El correo electrónico es obligatorio"),
	description: yup
		.string()
		.max(2000, "La descripción debe tener como mucho 2000 caracteres"),
	establishment_date: yup
		.date()
		.required("La fecha de establecimiento es obligatoria"),
	location: yup
		.object()
		.required("La ubicación es obligatoria")
	
})
