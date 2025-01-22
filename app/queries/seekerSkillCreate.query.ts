export default gql`
    mutation SeekerSkillCreate($createSeekerSkillInput: CreateSeekerSkillInput!) {
        seekerSkillCreate(createSeekerSkillInput: $createSeekerSkillInput) {
            id
        }
    }`