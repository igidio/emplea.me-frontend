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
		`,
		'get_all_admin_invitations': gql`
        query ConfirmationGetAllAdminInvitations {
            confirmationGetAllAdminInvitations {
                id
                type
                was_read
                created_at
                modified_at
            }
        }
		`,
		'read': gql`
        mutation ConfirmationReadOne($confirmationReadOneId: Float!) {
            confirmationReadOne(id: $confirmationReadOneId)
        }
		`
}