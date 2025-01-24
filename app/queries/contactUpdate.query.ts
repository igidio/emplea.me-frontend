export default gql`
    mutation ContactUpdate($updateContactInput: UpdateContactInput!) {
        contactUpdate(updateContactInput: $updateContactInput)
    }
`