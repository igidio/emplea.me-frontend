export default gql`
    mutation SeekerSocialDelete($seekerSocialDeleteId: Int!) {
        seekerSocialDelete(id: $seekerSocialDeleteId)
    }`