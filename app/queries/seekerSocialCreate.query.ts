export default gql`
    mutation SeekerSocialCreate($createSeekerSocialInput: CreateSeekerSocialInput!) {
        seekerSocialCreate(createSeekerSocialInput: $createSeekerSocialInput) {
            identifier
            name
        }
    }
`