export default gql`
    query EducationCreate($createEducationInput: CreateEducationInput!) {
        educationCreate(createEducationInput: $createEducationInput) {
            completion_year
        }
    }
`