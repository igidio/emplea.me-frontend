export default gql`
    query EducationUpdate($updateEducationInput: UpdateEducationInput!) {
        educationUpdate(updateEducationInput: $updateEducationInput)
    }
`