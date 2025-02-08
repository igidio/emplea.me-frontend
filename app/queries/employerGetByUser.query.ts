export default gql`
    query EmployerListByUser {
        employerListByUser {
            id
            level
            employer {
                id
                name
                profile_image
            }
        }
    }

`