<template>
	<EmployerPage :data="data.employer" v-if="data" />
</template>

<script setup lang="ts">
import type {EmployerInterface} from "~/interfaces";
const route = useRoute()

const query = gql`
query Employer($employerId: Int!) {
  employer(id: $employerId) {
    id
    name
    modified_at
    location {
      id
    }
    is_active
    establishment_date
    email
    description
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
    profile_image
    created_at
    is_verified
  }
}
`

const { data } = useAsyncQuery<{ employer: EmployerInterface }>(query, {"employerId": Number(route.params.id)})
</script>
