export default gql`
	mutation ConfirmationRecoveryAccount($token: String!, $password: String!) {
		confirmationRecoveryAccount(token: $token, password: $password) {
			id
		}
	}
`;
