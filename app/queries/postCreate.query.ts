export default gql`
    mutation PostCreate($createPostInput: CreatePostInput!) {
        postCreate(createPostInput: $createPostInput) {
            id
            name
            description
            available
            modality
            is_featured
            salary
            salary_type
            is_active
        }
    }
`