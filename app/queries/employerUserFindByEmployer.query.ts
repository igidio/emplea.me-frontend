export default gql`
    query EmployerUserFindByEmployer($employerUserFindByEmployerId: Int!) {
        employerUserFindByEmployer(id: $employerUserFindByEmployerId) {
            id
            has_confirm
            is_active
            is_first_user
            level
            modified_at
            user {
                id
                contact {
                    first_name
                    last_name
                }
            }
        }
    }
`