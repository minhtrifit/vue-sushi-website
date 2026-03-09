import { onMounted, onUnmounted } from "vue";

export function useScrollUp() {
  const handleScroll = () => {
    const el = document.getElementById("scroll-up");
    if (!el) return;

    if (window.scrollY >= 350) {
      el.classList.add("show-scroll");
    } else {
      el.classList.remove("show-scroll");
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
}
