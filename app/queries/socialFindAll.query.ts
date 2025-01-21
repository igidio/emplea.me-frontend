export default gql`
    query SocialFindAll {
        socialFindAll {
            id
            name
            prefix
            slug
            icon
            created_at
            modified_at
        }
    }

`