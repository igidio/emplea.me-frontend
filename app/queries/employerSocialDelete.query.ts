export default gql`
    mutation EmployerSocialDelete($employerSocialDeleteId: Float!, $idEmployer: Float!) {
        employerSocialDelete(id: $employerSocialDeleteId, id_employer: $idEmployer)
    }
`