export default gql`
    mutation ExperienceUpdate($updateExperienceInput: UpdateExperienceInput!) {
        experienceUpdate(updateExperienceInput: $updateExperienceInput)
    }
`