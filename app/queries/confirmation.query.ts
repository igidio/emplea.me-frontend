export default {
    'mail': gql`
        mutation Mutation {
            confirmationMail
        }
		`,
    'confirm': gql`
        mutation UserConfirm($verify: VerifyTokenInput!) {
            userConfirm(verify: $verify)
        }
		`,
    'verify': gql`
        query Query($verify: VerifyTokenInput!) {
            confirmationVerifyToken(verify: $verify)
        }
		`,
		'join': gql`
        mutation ConfirmationJoin($email: String!) {
            confirmationJoin(email: $email)
        }
		`
}