export default gql`
    query SubscriptionFindAll {
        subscriptionFindAll {
            id
            starts_at
            ends_at
            created_at
            autorenew
            is_valid
            plan {
                name
                id
                duration
                max_posts
                max_featured
                price
                benefits
                color
                active
            }
            transaction {
                id
                method {
                    id
                    type
                }
                amount
                status
                last_four
                brand
                created_at
                modified_at
            }
            user {
                id
                contact {
                    first_name
                    last_name
                }
            }
        }
    }

`