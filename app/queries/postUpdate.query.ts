export default gql`
    mutation PostUpdate($updatePostInput: UpdatePostInput!) {
        postUpdate(updatePostInput: $updatePostInput)
    }
`