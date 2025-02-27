export default {
	create: gql`
      mutation PostSkillCreate($createSeekerSkillInput: CreateSeekerSkillInput!, $postId: Int!) {
          postSkillCreate(createSeekerSkillInput: $createSeekerSkillInput, post_id: $postId) {
              id
          }
      }
	`,
		update: gql`
        mutation PostSkillUpdate($updateSeekerSkillInput: UpdateSeekerSkillInput!, $postId: Int!) {
            postSkillUpdate(updateSeekerSkillInput: $updateSeekerSkillInput, post_id: $postId)
        }
		`,
		delete: gql`
        mutation PostSkillDelete($postSkillDeleteId: Int!, $postId: Int!) {
            postSkillDelete(id: $postSkillDeleteId, post_id: $postId)
        }
		`
}