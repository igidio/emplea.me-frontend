export default gql`
mutation SubscriptionCreateByCard($createSubscriptionInput: CreateSubscriptionInput!, $createPaymentIntentInput: CreatePaymentIntentInput!) {
  subscriptionCreateByCard(createSubscriptionInput: $createSubscriptionInput, createPaymentIntentInput: $createPaymentIntentInput) {
    id
  }
}
`