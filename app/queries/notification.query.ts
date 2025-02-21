export default {
    by_user: gql`
        query NotificationByUser($limit: Float, $offset: Float) {
            notificationByUser(limit: $limit, offset: $offset) {
                id
                goto
                message
                title
                was_read
                was_cleared
                created_at
                modified_at
            }
        }
		`,
    by_user_and_check: gql`
        mutation Mutation {
            notificationByUserAndCheck
        }
		`,
    by_user_and_clear: gql`
        mutation NotificationByUserAndClear($idNotification: Float!) {
            notificationByUserAndClear(id_notification: $idNotification)
        }
    `
}