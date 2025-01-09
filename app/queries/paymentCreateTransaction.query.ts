export default gql`
    mutation StripeTransaction($input: CreatePaymentIntentInput!) {
        stripeTransaction(input: $input) {
            clientSecret
        }
    }
`