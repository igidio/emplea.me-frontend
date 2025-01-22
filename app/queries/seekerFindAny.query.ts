export default gql`
    query SkillFindAny($findAnySeekerInput: FindAnySeekerInput!) {
        skillFindAny(findAnySeekerInput: $findAnySeekerInput) {
            id
            name
        }
    }
`