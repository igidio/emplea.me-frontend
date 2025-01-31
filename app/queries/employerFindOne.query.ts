const cases = {
    default: gql`
        query FindOneEmployer($findOneEmployerId: Int!) {
            findOneEmployer(id: $findOneEmployerId) {
                employer {
                    created_at
                    description
                    id
                    name
                    establishment_date
                    profile_image
                    email
                    is_verified
                    is_active
                    modified_at
                    location {
                        id
                        municipality
                        province
                        department
                    }
                    post {
                        available
                        name
                        location {
                            municipality
                            province
                            department
                        }
                        is_active
                        is_featured
                        id
                        description
                    }
                }
                employerUser {
                    created_at
                    id
                    level
                    modified_at
                }
            }
        }
    `,
    not_seeker: gql`
        query FindOneEmployer($findOneEmployerId: Int!) {
            findOneEmployer(id: $findOneEmployerId) {
                employer {
                    created_at
                    description
                    id
                    name
                    establishment_date
                    profile_image
                    email
                    is_verified
                    is_active
                    modified_at
                    phone {
                        id
                        phone
                    }
                    location {
                        id
                        municipality
                        province
                        department
                    }
                    employerUser {
                        id
                        level
                        created_at
                        modified_at
                    }
                    employer_social {
                        id
                        name
                        identifier
                        created_at
                        modified_at
                    }
                    post {
                        available
                        name
                        location {
                            municipality
                            province
                            department
                        }
                        is_active
                        is_featured
                        id
                        description
                    }
                }
                employerUser {
                    created_at
                    id
                    level
                    modified_at
                }
            }
        }
    `,
    edit: gql`
        query FindOneEmployer($findOneEmployerId: Int!) {
            findOneEmployer(id: $findOneEmployerId) {
                employer {
                    id
                    name
                    description
                    establishment_date
                    email
                    profile_image
                    is_verified
                    is_active
                    created_at
                    modified_at
                    phone {
                        id
                        phone
                    }
                    location {
                        id
                        municipality
                        province
                        department
                    }
                    employerUser {
                        id
                        level
                        created_at
                        modified_at
                    }
                    employer_social {
                        id
                        name
                        identifier
                        created_at
                        modified_at
                    }
                }
                employerUser {
                    created_at
                    id
                    level
                    modified_at
                }
            }
        }
    `
}

export default (gql_case:string ='default') => {
	return cases[gql_case as keyof typeof cases]
}

