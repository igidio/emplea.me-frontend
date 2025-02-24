export default {
	load_interactions: gql`
      query InteractionLoadByPost($idPost: Float!) {
          interactionLoadByPost(id_post: $idPost) {
              id
              confirm
              created_at
              modified_at
              seeker {
                  id
                  show_phone
                  show_email
                  location {
                      department
                      province
                      municipality
                  }
                  education {
                      id
                      title
                      subtitle
                      starting_year
                      completion_year
                      degree
                      institute {
                          name
                      }
                  }
                  experience {
                      start_date
                      end_date
                      id
                      title
                      company
                      description
                  }
                  seeker_social {
                      id
                      name
                      identifier
                      social {
                          id
                          name
                          prefix
                          slug
                          icon
                      }
                  }
                  seeker_skill {
                      id
                      level
                      skill {
                          name
                          id
                      }
                  }
                  user {
                      id
                      image
                      email
                      contact {
                          first_name
                          last_name
                          phone
                          gender
                          date_of_birth
                          created_at
                      }
                  }
              }
          }
      }
	
	
	`
}