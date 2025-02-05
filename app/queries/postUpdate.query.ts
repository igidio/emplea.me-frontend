export default gql`
    mutation PostUpdate($updatePostInput: UpdatePostInput!, $messageInput: MessageOptInput) {
        postUpdate(updatePostInput: $updatePostInput, messageInput: $messageInput)
    }
`