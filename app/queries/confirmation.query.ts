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
}