export function format_date(date: Date) {
	let day = date.getDate().toString().padStart(2, "0");
	let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan desde 0
	let year = date.getFullYear();
	return `${day}/${month}/${year}`;
}
