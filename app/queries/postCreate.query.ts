export default gql`
    mutation PostCreate($createPostInput: CreatePostInput!) {
        postCreate(createPostInput: $createPostInput) {
            id
            name
            description
            available
            modality
            featured {
                id
            }
            salary
            salary_type
            is_active
        }
    }
`