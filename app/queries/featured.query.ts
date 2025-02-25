export default {
	create: gql`
      mutation FeaturedCreate($idPost: Int!) {
          featuredCreate(id_post: $idPost) {
              id
              created_at
          }
      }
	`,
		delete: gql`
        mutation FeaturedDelete($idPost: Int!) {
            featuredDelete(id_post: $idPost)
        }
		`
}