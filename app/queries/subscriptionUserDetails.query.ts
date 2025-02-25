export default gql`
    query SubscriptionUserDetails {
        subscriptionUserDetails {
            ends_at
            featured_remaining
            starts_at
            is_valid
            plan {
                active
                id
                name
                duration
                max_featured
                price
                benefits
                color
            }
        }
    }

`