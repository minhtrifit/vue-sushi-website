import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { updateSection } from "../api/section.api";

export const useUpdateSectionMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updateSection(id, payload),
  });

  const loading = computed(() => mutation.isPending.value);
  const error = computed(() => mutation.error.value);
  const data = computed(() => mutation.data.value);

  return {
    update: mutation.mutate,
    updateAsync: mutation.mutateAsync,
    loading,
    error,
    data,
  };
};
