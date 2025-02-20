export default {
	by_user: gql`
      query NotificationByUser($limit: Float, $offset: Float) {
          notificationByUser(limit: $limit, offset: $offset) {
              id
              goto
              message
              was_read
              was_cleared
              created_at
              modified_at
          }
      }
	
	`
}