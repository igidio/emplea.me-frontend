export default gql`
    query AllPlans {
        allPlans {
            active
            benefits
            color
            duration
            id
            max_featured
            name
            price
        }
    }
`;
