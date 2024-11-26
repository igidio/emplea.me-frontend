export default gql`
    query Post($postId: Int!) {
        post(id: $postId) {
            available
            category {
                icon
                id
                name
            }
            created_at
            description
            employer {
                email
                name
                profile_image
                id
            }
            is_active
            is_featured
            location {
                department
                municipality
                province
                id
            }
            name
            modality
            modified_at
            salary
            salary_type
        }
    }
`;
