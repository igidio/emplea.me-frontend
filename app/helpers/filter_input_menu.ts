export const filter_input_menu = (
	{
		menu_items,
		property_to_filter,
		search_term
	}: {
		menu_items: any[],
		property_to_filter: string,
		search_term: string
	}
) => {
	const flat_names = menu_items.flatMap(e => e[property_to_filter])
	return [
		((search_term !== '') && !flat_names.includes(search_term)) && {name: search_term},
		...(menu_items ?? [])
	].filter((e) => e !== false)
}