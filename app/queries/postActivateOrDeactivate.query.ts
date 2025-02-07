export default gql`
    mutation PostActivateOrDeactivate($postActivateOrDeactivateId: Int!, $messageOptInput: MessageOptInput!) {
        postActivateOrDeactivate(id: $postActivateOrDeactivateId, messageOptInput: $messageOptInput)
    }
`