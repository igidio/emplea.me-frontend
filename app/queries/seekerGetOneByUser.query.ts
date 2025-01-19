export default gql`
    query SeekerFindByUser {
        seekerFindByUser {
            id
            show_phone
            show_email
            location {
                id
                municipality
                province
                department
            }
            education {
                id
                title
                starting_year
                completion_year
                deegree
                institute {
                    id
                    name
                    created_at
                    modified_at
                }
                created_at
                modified_at
            }
            experience {
                id
                start_date
                end_date
                title
                company
                description
                created_at
                modified_at
            }
            seeker_social {
                id
                name
                identifier
                created_at
                modified_at
                social {
                    id
                    name
                    prefix
                    slug
                }
            }
            seeker_skill {
                id
                level
                created_at
                modified_at
            }
        }
    }
`