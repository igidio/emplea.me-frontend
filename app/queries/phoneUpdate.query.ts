export default gql`
    mutation PhoneUpdate($updatePhoneInput: UpdatePhoneInput!) {
        phoneUpdate(updatePhoneInput: $updatePhoneInput)
    }
`