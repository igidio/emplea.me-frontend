export default gql`
    mutation ExperienceCreate($createExperienceInput: CreateExperienceInput!) {
        experienceCreate(createExperienceInput: $createExperienceInput) {
            company
            id
            start_date
            end_date
            title
            description
        }
    }

`