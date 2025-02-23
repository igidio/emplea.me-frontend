export default {
	change_plan_price: gql`
      mutation PlanChangePlanPrice($planChangePlanPriceId: Float!, $price: Float!) {
          planChangePlanPrice(id: $planChangePlanPriceId, price: $price) {
              price
          }
      }
	`
}