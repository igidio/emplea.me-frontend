export default gql`
    mutation SeekerSkillDelete($seekerSkillDeleteId: Int!) {
        seekerSkillDelete(id: $seekerSkillDeleteId)
    }
`