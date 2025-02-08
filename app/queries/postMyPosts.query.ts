export default gql`
    query PostMyPosts {
        postMyPosts {
            available
            description
            category {
                icon
                id
                name
            }
            employer {
                name
                id
                profile_image
            }
            employer_user {
                id
                level
                user {
                    id
                    contact {
                        first_name
                        last_name
                        id
                    }
                    image
                }
            }
            id
            interaction {
                modified_at
                confirm
                seeker {
                    id
                    user {
                        id
                        contact {
                            first_name
                            last_name
                        }
                        image
                    }
                }
            }
            is_active
            featured {
                id
            }
            location {
                municipality
                province
                department
            }
            modality
            modified_at
            created_at
            name
            salary
            salary_type
            post_skill {
                id
                level
                skill {
                    name
                }
            }
        }
    }
`