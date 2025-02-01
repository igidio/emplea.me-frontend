export default gql`
    mutation EmployerSocialUpdate($updateEmployerSocialInput: UpdateEmployerSocialInput!) {
        employerSocialUpdate(updateEmployerSocialInput: $updateEmployerSocialInput)
    }
`