export default gql`
    mutation PostToggleAvailability($postToggleAvailabilityId: Int!) {
        postToggleAvailability(id: $postToggleAvailabilityId)
    }
`