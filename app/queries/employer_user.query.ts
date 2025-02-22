export default {
	toggle_active: gql`
      mutation EmployerToggleActive($employerToggleActiveId: Int!, $idEmployer: Int!) {
          employerToggleActive(id: $employerToggleActiveId, id_employer: $idEmployer)
      }
	`,
	toggle_level: gql`
      mutation EmployerToggleLevel($employerToggleLevelId: Int!, $idEmployer: Int!) {
          employerToggleLevel(id: $employerToggleLevelId, id_employer: $idEmployer)
      }
	`
}