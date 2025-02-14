export default gql`
	query GetUserByToken {
		getUserByToken {
			id
			username
			contact {
				phone
				id
				first_name
				last_name
				gender
				date_of_birth
				created_at
				modified_at
			}
			email
			is_active
			role
			image
			google_id
			facebook_id
			created_at
			modified_at
		}
	}
`;
