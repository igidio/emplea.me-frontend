export const get_age = (date_of_birth: Date) => {
	const today = new Date();
	const birthDate = new Date(date_of_birth);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};
