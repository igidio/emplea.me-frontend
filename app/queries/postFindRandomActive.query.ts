export default gql`
    query FindRandomActivePosts {
        findRandomActivePosts {
            id
            name
            description
            featured {
                id
            }
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