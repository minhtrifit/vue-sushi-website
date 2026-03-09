import { onMounted, onUnmounted } from "vue";

export function useScrollHeader() {
  const handleScroll = () => {
    const header = document.getElementById("header");
    if (!header) return;

    if (window.scrollY >= 50) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
}
