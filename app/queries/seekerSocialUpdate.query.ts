export default gql`
    mutation SeekerSocialUpdate($updateSeekerSocialInput: UpdateSeekerSocialInput!, $seekerSocialUpdateId: Int!) {
        seekerSocialUpdate(updateSeekerSocialInput: $updateSeekerSocialInput, id: $seekerSocialUpdateId)
    }
`