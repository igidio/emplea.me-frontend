export default {
    linkGoogle: gql`
        mutation UserLinkGoogle($googleId: String!) {
            userLinkGoogle(google_id: $googleId)
        }
		`,
    unlinkGoogle: gql`
        mutation Mutation {
            userUnlinkGoogle
        }
		`,
    linkFacebook: gql`
        mutation UserLinkFacebook($facebookId: String!) {
            userLinkFacebook(facebook_id: $facebookId)
        }
		`,
    unlinkFacebook: gql`
        mutation Mutation {
            userUnlinkFacebook
        }
		`,
    recovery_account: gql`
        mutation Mutation($verify: VerifyTokenInput!, $password: String!) {
            userRecoveryAccount(verify: $verify, password: $password)
        }
    `,
    find_all: gql`
        query UserFindAll {
            userFindAll {
                id
                image
                username
                contact {
                    first_name
                    last_name
                    id
                    phone
                    gender
                    date_of_birth
                }
                is_active
                email
                role
                google_id
                facebook_id
                has_activated
                created_at
                modified_at
            }
        }
    `,
    toggle_active: gql`
        mutation UserToggleActive($messageInput: MessageInput!, $userToggleActiveId: Int!) {
            userToggleActive(messageInput: $messageInput, id: $userToggleActiveId)
        }
    `,
    admin_register: gql`
        mutation AdminRegister($verify: VerifyTokenInput!, $createUser: CreateUserInput!) {
            adminRegister(verify: $verify, createUser: $createUser) {
                email
                role
                token
                username
            }
        }
    `
}