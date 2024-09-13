export default gql`
	mutation Login($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
			token
			user {
				id
				username
				email
				image
				google_id
				linkedin_id
				created_at
				modified_at
				role
				is_active
				contact {
					first_name
					last_name
					phone
					gender
					date_of_birth
					created_at
					modified_at
				}
			}
		}
	}
`;
