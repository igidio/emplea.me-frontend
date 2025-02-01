export default gql`
    mutation PhoneDelete($phoneDeleteId: Float!, $idEmployer: Float!) {
        phoneDelete(id: $phoneDeleteId, id_employer: $idEmployer)
    }
`