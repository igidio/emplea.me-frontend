export default gql`
    query Query($educationDeleteId: Float!) {
        educationDelete(id: $educationDeleteId)
    }
`