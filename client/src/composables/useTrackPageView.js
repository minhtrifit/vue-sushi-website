import { useMutation } from "@tanstack/vue-query";
import { trackPageView } from "../pages/admin/api/stats.api";

export const useTrackPageView = (options = {}) => {
  const { useLocalStorage = true, storageKey = "tracked_pages" } = options;

  const mutation = useMutation({
    mutationFn: (page) => trackPageView(page),
  });

  const isTracked = (page) => {
    if (!useLocalStorage) return false;

    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return data.includes(page);
  };

  const markTracked = (page) => {
    if (!useLocalStorage) return;

    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (!data.includes(page)) {
      data.push(page);
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  };

  const track = (page) => {
    if (isTracked(page)) return;

    mutation.mutate(page, {
      onSuccess: () => {
        markTracked(page);
      },
    });
  };

  return {
    ...mutation,
    track,
  };
};
