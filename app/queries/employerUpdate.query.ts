export default gql`
    mutation EmployerUpdate($employerUpdate: UpdateEmployerInput!) {
        employerUpdate(employerUpdate: $employerUpdate)
    }
`