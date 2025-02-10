export default gql`
    mutation EmployerUserSendInvitation($input: String!, $idEmployer: Int!) {
        employerUserSendInvitation(input: $input, id_employer: $idEmployer) {
            contact {
                first_name
                last_name
            }
        }
    }
`