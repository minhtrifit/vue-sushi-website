import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { createContact } from "../pages/admin/api/contact.api";

export const useCreateContactMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ email }) => createContact(email),
  });

  const loading = computed(() => mutation.isPending.value);
  const error = computed(() => mutation.error.value);
  const data = computed(() => mutation.data.value);

  return {
    sendContact: mutation.mutate,
    sendContactAsync: mutation.mutateAsync,
    loading,
    error,
    data,
  };
};
