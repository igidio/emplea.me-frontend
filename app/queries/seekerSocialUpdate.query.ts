export default ({ id, name, identifier, social }:{ id: number, name: string, identifier: string, social: number }) => gql`
    mutation SeekerSocialUpdate($updateSeekerSocialInput: UpdateSeekerSocialInput!, $seekerSocialUpdateId: Int!) {
        seekerSocialUpdate(updateSeekerSocialInput: $updateSeekerSocialInput, id: $seekerSocialUpdateId)
    }
`