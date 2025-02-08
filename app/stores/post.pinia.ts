import {defineStore} from "pinia";
import type {categoryInterface} from "~/interfaces/search-model.interface";
import locationGetQuery from "~/queries/locationGet.query";
import type {CategoryInterface, LocationInterface, PlanInterface} from "~/interfaces";

export const usePostStore = defineStore("post", () => {
  const categories: Ref<CategoryInterface[]> = ref([]);
  const locations: Ref<LocationInterface[]> = ref([]);
  const plans: Ref<PlanInterface[]> = ref([]);

  const set_categories = (new_categories: CategoryInterface[]) => {
    categories.value = new_categories;
  }

  const set_locations = (new_locations: LocationInterface[]) => {
    locations.value = new_locations;
  }
  
  const set_plans = (new_plans: PlanInterface[]) => {
    plans.value = new_plans;
  }

  const location_options = computed(() => locations.value.map((e:any) => ({
    id: e.id,
    name: `${e.department}, ${e.municipality}, ${e.province}`
  })))

  return {
    categories,
    locations,
    location_options,
    set_categories,
    set_locations,
    set_plans,
    plans
  }
});
