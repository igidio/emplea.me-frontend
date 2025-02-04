export default gql`
    mutation EmployerVerify($idEmployer: Float!) {
        employerVerify(id_employer: $idEmployer) {
            id
            is_active
        }
    }

`