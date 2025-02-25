export default gql`
    query PostsFromRange(
        $paginationDto: PaginationDto!
        $searchAdditionalInputsDto: SearchAdditionalInput
    ) {
        postsFromRange(
            paginationDto: $paginationDto
            SearchAdditionalInputsDto: $searchAdditionalInputsDto
        ) {
            total
            found {
                id
                name
                description
                featured {
                    id
                }
                employer {
                    id
                    name
                    profile_image
                    location {
                        department,
                        municipality,
                        province
                    }
                }
            }
        }
    }
`;