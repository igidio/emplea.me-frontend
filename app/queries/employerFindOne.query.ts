export default () => {
	return gql`
      query FindOneEmployer($findOneEmployerId: Int!) {
          findOneEmployer(id: $findOneEmployerId) {
              employer {
                  created_at
                  description
                  id
                  name
                  establishment_date
                  profile_image
                  email
                  is_verified
                  is_active
                  modified_at
                  location {
                      id
                      municipality
                      province
                      department
                  }
                  post {
                      available
                      name
                      location {
                          municipality
                          province
                          department
                      }
                      is_active
                      is_featured
                      id
                      description
                  }
              }
              employerUser {
                  created_at
                  id
                  level
                  modified_at
              }
          }
      }
  `
}