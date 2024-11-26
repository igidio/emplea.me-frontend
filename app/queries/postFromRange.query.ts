export default gql`
    query PostsFromRange($paginationDto: PaginationDto!) {
        postsFromRange(paginationDto: $paginationDto) {
            id
            name
            description
            employer {
                name
                profile_image
            }
        }
    }
`;