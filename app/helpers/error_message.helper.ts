import { ApolloError } from "@apollo/client/core/index.js";

export function create_error_message(error: Ref<ApolloError | null>) {
	return computed(() => {
		if (error.value?.graphQLErrors[0]) {
			if (error.value?.graphQLErrors[0].extensions?.originalError) {
				return (
					error.value?.graphQLErrors[0].extensions?.originalError as {
						message: string[];
					}
				)?.message[0];
			}
			return error.value?.graphQLErrors[0].message;
		}
		// if (error.value?.protocolErrors) {
		// 	return "Error de red";
		// }
		if (error.value?.networkError) {
			return "Error de red";
		}
		return "Error desconocido";
	});
}
