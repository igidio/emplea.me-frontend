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
                employer {
                    name
                    profile_image
                }
            }
        }
    }
`;