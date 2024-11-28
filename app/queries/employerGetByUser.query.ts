export default gql`
    query EmployerlistByUser($id: Int!) {
        EmployerlistByUser(id: $id) {
            id
            created_at
            employer {
                id
                name
                profile_image
                modified_at
                location {
                    department
                    id
                    municipality
                    province
                }
                is_active
                is_verified
                email
                establishment_date
                description
                created_at
            }
            user {
                role
            }
            level
            modified_at
            post {
                available
                id
                description
                name
            }
        }
    }
`