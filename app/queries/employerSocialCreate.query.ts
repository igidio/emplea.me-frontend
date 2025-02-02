export default gql`
    mutation EmployerSocialCreate($createEmployerSocialInput: CreateEmployerSocialInput!) {
        employerSocialCreate(createEmployerSocialInput: $createEmployerSocialInput) {
            id
        }
    }
`