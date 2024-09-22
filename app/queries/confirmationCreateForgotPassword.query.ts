export default gql`
	mutation Mutation($email: String!) {
		confirmationCreateForgotPassword(email: $email)
	}
`;
