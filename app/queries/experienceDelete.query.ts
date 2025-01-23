export default gql`
    mutation ExperienceDelete($experienceDeleteId: Float!) {
        experienceDelete(id: $experienceDeleteId)
    }
`