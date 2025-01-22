export const set_education_years = (
	{
		starting_year,
		completion_year
	} : {
		starting_year?: number,
		completion_year?: number
	}
) => {
	if (starting_year && completion_year) {
		return `${starting_year} - ${completion_year}`;
	} else if (starting_year && !completion_year) {
		return `Empezó el ${starting_year}`;
	} else if (!starting_year && completion_year) {
		return `Terminó en ${completion_year}`;
	}
}