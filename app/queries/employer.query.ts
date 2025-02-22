export default {
	list_by_query: gql`
      query EmployerListByQuery($query: String) {
          employerListByQuery(query: $query) {
              id
              profile_image
              name
          }
      }
	`
}