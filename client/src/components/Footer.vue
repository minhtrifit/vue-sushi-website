<script setup>
import { onMounted } from "vue";
import { sr } from "@/libs/index";

const handleRevealSection = () => {
  sr.reveal(`.footer__container`, {
    distance: "20px",
  });
};

onMounted(() => {
  handleRevealSection();
});
</script>

<template>
  <footer class="footer">
    <div class="footer__container container grid">
      <a href="#" class="footer__logo">Sushi</a>

      <div class="footer__social">
        <a
          href="https://example.com"
          target="_blank"
          class="footer__social-link"
        >
          <i class="ri-facebook-circle-line"></i>
        </a>

        <a
          href="https://example.com"
          target="_blank"
          class="footer__social-link"
        >
          <i class="ri-instagram-line"></i>
        </a>

        <a
          href="https://example.com"
          target="_blank"
          class="footer__social-link"
        >
          <i class="ri-twitter-x-line"></i>
        </a>
      </div>

      <span class="footer__copy">
        &#169; All Rights Reserved By minhtrifit
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 2rem;
}

.footer__container {
  row-gap: 1rem;
  text-align: center;
}

.footer__logo {
  font: var(--font-semi-bold) var(--bigger-font-size) var(--second-font);
  color: var(--first-color);
  justify-self: center;
}

.footer__social {
  display: flex;
  justify-content: center;
  column-gap: 1.5rem;
}

.footer__social-link {
  font-size: 1.5rem;
  color: var(--title-color);
  transition: color 0.4s;
}

.footer__social-link:hover {
  color: var(--first-color);
}

.footer__copy {
  margin-top: 3rem;
  font-size: var(--small-font-size);
}

/* For large devices <> */
@media screen and (width >= 1150px) {
  .footer {
    padding-top: 3rem;
  }

  .footer__container {
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
  }

  .footer__logo {
    font-size: var(--h2-font-size);
    justify-self: flex-start;
  }

  .footer__social {
    order: 1;
    justify-self: flex-end;
  }

  .footer__copy {
    margin: 0;
  }

  .scrollup {
    right: 3rem;
  }
}
</style>
