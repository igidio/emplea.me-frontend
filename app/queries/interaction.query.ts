export default {
	register: gql`
      mutation InteractionRegister($idPost: Float!, $confirm: Boolean) {
          interactionRegister(id_post: $idPost, confirm: $confirm) {
              confirm
          }
      }
	`
}