interface split_date_interface {
	year: number;
	month_index: number;
}

export const split_date = (date: Date): split_date_interface => {
	
	const new_date = new Date(date);
	
	return {
		year: new_date.getFullYear(),
		month_index: new_date.getMonth() + 1
	};
}