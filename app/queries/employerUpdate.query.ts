export default (is_admin: boolean = false) => {
	return (!is_admin) ? gql`
      mutation EmployerUpdate($employerUpdate: UpdateEmployerInput!) {
          employerUpdate(employerUpdate: $employerUpdate)
      }
	` : gql`
      mutation EmployerUpdate($employerUpdate: UpdateEmployerInput!, $messageInput: MessageOptInput) {
          employerUpdate(employerUpdate: $employerUpdate, messageInput: $messageInput)
      }
	`
}