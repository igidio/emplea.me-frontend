import * as yup from "yup";

export const post_schema = yup.object({
	name: yup
		.string()
		.required("El título es obligatorio")
		.min(5, "El título debe tener al menos 5 caracteres")
		.max(40, "El nombre debe tener como mucho 40 caracteres"),
	description: yup
		.string()
		.max(2000, "La descripción debe tener como mucho 2000 caracteres")
		.required("La descripción es obligatoria"),
	category: yup
		.object()
		.required("La categoría es obligatoria"),
	modality: yup
		.string()
		.required("La modalidad es obligatoria")
	,
	salary: yup
		.number()
		.min(0, "El salario debe ser mayor a 0"),
	salary_type: yup
		.string(),
	location: yup
		.object()
		.required("La ubicación es obligatoria")
})
