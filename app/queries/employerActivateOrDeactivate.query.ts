export default gql`
    mutation EmployerActivateOrDeactivate($employerActivateOrDeactivateId: Int!, $messageInput: MessageInput!) {
  employerActivateOrDeactivate(id: $employerActivateOrDeactivateId, messageInput: $messageInput)
}

`