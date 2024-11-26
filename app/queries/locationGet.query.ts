export default gql`
    query AllLocations {
        allLocations {
            id
            department
            municipality
            province
        }
    }
`;