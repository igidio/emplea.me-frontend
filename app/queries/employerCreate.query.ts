export default gql`
    mutation EmployerCreate($createEmployerInput: CreateEmployerInput!) {
        employerCreate(createEmployerInput: $createEmployerInput) {
            id
        }
    }
`