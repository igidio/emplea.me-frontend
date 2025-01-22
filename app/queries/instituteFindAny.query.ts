export default gql`
    query InstituteFindAny($findAnyInstituteInput: FindAnyInstituteInput!) {
        instituteFindAny(findAnyInstituteInput: $findAnyInstituteInput) {
            name
            id
        }
    }
`