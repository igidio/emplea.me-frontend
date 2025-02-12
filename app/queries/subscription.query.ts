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


}