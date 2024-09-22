export default gql`
	mutation ConfirmationVerifyToken($verify: VerifyTokenInput!) {
		confirmationVerifyToken(verify: $verify)
	}
`;
