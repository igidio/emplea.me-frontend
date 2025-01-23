export default gql`
    query Query($updateExperienceInput: UpdateExperienceInput!) {
        experienceUpdate(updateExperienceInput: $updateExperienceInput)
    }
`