export default gql`
    mutation Mutation($idEmployer: Float!) {
        deleteEmployerImage(id_employer: $idEmployer)
    }
`;
