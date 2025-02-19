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
    `
}