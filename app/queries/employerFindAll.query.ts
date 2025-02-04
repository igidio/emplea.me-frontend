export default gql`
    query EmployerFindAll {
        employerFindAll {
            id
            name
            establishment_date
            email
            profile_image
            is_verified
            is_active
            created_at
            modified_at
            description
            location {
                department
                province
                municipality
            }
        }
    }

`