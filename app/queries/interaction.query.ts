export default {
	register: gql`
      mutation InteractionRegister($idPost: Float!, $confirm: Boolean) {
          interactionRegister(id_post: $idPost, confirm: $confirm) {
              confirm
          }
      }
	`,
		get: gql`
        query InteractionGet($showAll: Boolean) {
            interactionGet(show_all: $showAll) {
                id
                confirm
                post {
                    id
                    name
                    description
                    available
                    is_active
                    has_disabled
                    employer {
                        id
                        name
                        profile_image
                    }
                    location {
                        id
                        municipality
                        province
                        department
                    }
                    interaction {
                        id
                        confirm
                    }
                    category {
                        id
                        name
                        icon
                    }
                    featured {
                        id
                    }
                }
                created_at
                modified_at
            }
        }
		`
}