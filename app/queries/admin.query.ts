export default {
	admin: gql`
      query Admin_user {
          admin {
              admin_user {
                  users_admin
                  users_employer
                  users_seeker
                  users_super
                  users_total
              }
              last_posts {
                  average_interactions
                  last_month
                  last_week
                  total_interactions
                  total
              }
              post_per_category {
                  category
                  total
              }
              post_reach {
                  day
                  featured
                  not_featured
              }
              posts_per_day {
                  day
                  total
              }
              posts_per_modality {
                  modality
                  total
              }
              posts_per_salary_type {
                  total
                  type
              }
              posts_per_skill {
                  skill
                  total
              }
              top_ten_posts_per_location {
                  location
                  total
              }
              posts_per_employer {
                  total
                  employer
              }
          }
      }
  	
	
	`
}