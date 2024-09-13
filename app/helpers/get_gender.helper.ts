const gender_values: Record<string, string> = {
	MALE: "Hombre",
	FEMALE: "Mujer",
};

export const get_gender = (gender: string) => {
	return gender_values[gender];
};
