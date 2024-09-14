export default gql`
	mutation UserUpdate($updateUserInput: UpdateUserInput!) {
		userUpdate(updateUserInput: $updateUserInput) {
			username
		}
	}
`;
