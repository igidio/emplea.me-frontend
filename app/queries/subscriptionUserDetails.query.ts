export default gql`
    query SubscriptionUserDetails {
        subscriptionUserDetails {
            ends_at
            featured_remaining
            starts_at
            posts_remaining
            is_valid
            plan {
                active
                id
                name
                duration
                max_posts
                max_featured
                price
                benefits
                color
            }
        }
    }

`