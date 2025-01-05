export default gql`
    query FindRandomActivePosts {
        findRandomActivePosts {
            id
            name
            description
            employer {
                id
                name
                profile_image,
                location {
                    department,
                    municipality,
                    province
                }
            }
        }
    }
`;