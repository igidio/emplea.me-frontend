export default gql`
    mutation UserChangePassword($updatePasswordInput: UpdatePasswordInput!) {
        userChangePassword(updatePasswordInput: $updatePasswordInput)
    }
`