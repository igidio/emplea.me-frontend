export default gql`
    mutation SeekerChangeLocation($seekerChangeLocationId: Float!) {
        seekerChangeLocation(id: $seekerChangeLocationId)
    }
`
