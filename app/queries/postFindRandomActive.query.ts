export default gql`
    query FindRandomActivePosts {
        findRandomActivePosts {
            id
            name
            description
            employer {
                name
                profile_image
            }
        }
    }
`;