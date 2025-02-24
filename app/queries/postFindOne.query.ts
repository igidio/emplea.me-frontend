export default (show_employer_info:boolean = false) => {
    return (show_employer_info) ?  gql`
        query Post($id: Int!) {
            post(id: $id) {
                post {
                    id
                    name
                    description
                    available
                    has_disabled
                    modality
                    featured {
                        id
                    }
                    salary
                    salary_type
                    is_active
                    created_at
                    modified_at
                    location {
                        id
                        municipality
                        province
                        department
                    }
                    category {
                        id
                        name
                        icon
                        created_at
                        modified_at
                    }
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
                        employer_social {
                            social {
                                icon
                                id
                                name
                                prefix
                                slug
                            }
                            name
                            modified_at
                            identifier
                            id
                            created_at
                        }
                        phone {
                            has_whatsapp
                            id
                            phone
                        }
                    }
                    post_skill {
                        id
                        level
                        skill {
                            name
                            id
                        }
                    }
                }
                info {
                    type
                    can_modify
                    show_employer
                }
            }
        }
    ` : gql`
        query Post($id: Int!) {
            post(id: $id) {
                post {
                    id
                    name
                    description
                    available
                    modality
                    featured {
                        id
                    }
                    salary
                    salary_type
                    is_active
                    created_at
                    modified_at
                    location {
                        id
                        municipality
                        province
                        department
                    }
                    category {
                        id
                        name
                        icon
                        created_at
                        modified_at
                    }
                    employer {
                        id
                        name
                        description
                        establishment_date
                        profile_image
                        is_verified
                        is_active
                        created_at
                        modified_at
                    }
                    post_skill {
                        id
                        level
                        skill {
                            name
                            id
                        }
                    }
                }
                info {
                    type
                    can_modify
                    show_employer
                }
            }
        }
    `
};
