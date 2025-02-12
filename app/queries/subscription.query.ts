export default {
    'list': gql`
        query SubscriptionList($query: String!) {
            subscriptionList(query: $query) {
                id
                contact {
                    first_name
                    last_name
                }
            }
        }
		`,
    'show_potential_user_subscription': gql`
        query SubscriptionShowPotentialUserSubscription($showUserSubscriptionInput: ShowUserSubscriptionInput!) {
            subscriptionShowPotentialUserSubscription(ShowUserSubscriptionInput: $showUserSubscriptionInput) {
                ends_at
                full_name
                id
                is_currently_subscribed
                starts_at
            }
        }
		`,
    'create': gql`
        mutation SubscriptionCreate($createSubscriptionInput: CreateSubscriptionInput!, $idMethod: Int!, $idUser: Int!) {
            subscriptionCreate(createSubscriptionInput: $createSubscriptionInput, id_method: $idMethod, id_user: $idUser) {
                id
            }
        }
		`,
		'toggle_verify': gql`
        mutation SubscriptionToggleVerify($subscriptionToggleVerifyId: Int!, $message: String) {
            subscriptionToggleVerify(id: $subscriptionToggleVerifyId, message: $message)
        }
		`,
    'toggle_renew': gql`
        mutation SubscriptionToggleRenew($subscriptionToggleRenewId: Int!, $messageInput: MessageOptInput) {
            subscriptionToggleRenew(id: $subscriptionToggleRenewId, messageInput: $messageInput)
        }
		`,

}