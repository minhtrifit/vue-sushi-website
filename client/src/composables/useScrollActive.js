import { onMounted, onUnmounted } from "vue";

export function useScrollActive() {
  const scrollActive = () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const id = section.id;
      const top = section.offsetTop - 200;
      const height = section.offsetHeight;

      const link = document.querySelector(`.nav__menu a[href*=${id}]`);
      if (!link) return;

      link.classList.toggle(
        "active-link",
        scrollY > top && scrollY <= top + height,
      );
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", scrollActive);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollActive);
  });
}
