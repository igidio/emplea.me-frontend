export default gql`
	mutation ClientSignup(
		$createUser: CreateUserInput!
		$clientRole: ClientRoleInput!
	) {
		clientSignup(createUser: $createUser, clientRole: $clientRole) {
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
