import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useQueryParams() {
  const route = useRoute();
  const router = useRouter();

  const paramsObject = computed(() => ({
    ...route.query,
  }));

  const updateParams = (newParams) => {
    const updated = { ...route.query };

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        delete updated[key];
      } else {
        updated[key] = value;
      }
    });

    router.replace({
      query: updated,
    });
  };

  return {
    params: paramsObject,
    updateParams,
  };
}
