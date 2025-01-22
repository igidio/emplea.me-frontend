export default gql`
    mutation SeekerSkillUpdate($updateSeekerSkillInput: UpdateSeekerSkillInput!) {
        seekerSkillUpdate(updateSeekerSkillInput: $updateSeekerSkillInput)
    }
`