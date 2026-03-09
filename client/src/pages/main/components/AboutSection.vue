<script setup>
import { onMounted } from "vue";
import { sr } from "@/libs/index";

const handleRevealSection = () => {
  sr.reveal(`.about__data .section__title`);
  sr.reveal(`.about__data .section__title`, {
    delay: 600,
  });
  sr.reveal(`.about__description`, {
    delay: 900,
  });
  sr.reveal(`.about__data .button`, {
    delay: 1200,
    distance: 0,
    scale: 0,
  });
  sr.reveal(`.about__blob`, {
    delay: 1200,
    origin: "left",
  });
  sr.reveal(`.about__img`, {
    delay: 1500,
    origin: "right",
  });
  sr.reveal(`.about__data img`, {
    delay: 1800,
    distance: 0,
    interval: 200,
    scale: 0,
  });
  sr.reveal(`.about__text`, {
    delay: 1200,
  });
};

onMounted(() => {
  handleRevealSection();
});
</script>

<template>
  <section class="about section" id="about">
    <div class="about__container container grid">
      <div class="about__data">
        <span class="section__subtitle">About Us / 私たちについて</span>

        <h2 class="section__title">
          We Serve You The <br />
          Authentic <span>Japanese Flavor</span>
        </h2>

        <p class="about__description">
          We have been operating for ten years to continue serving Japanese
          food, with authentic flavors that we will continue to naturalize for
          you.
        </p>

        <a href="#new" class="button">Special Menu</a>

        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="about__flower-1"
        />
        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="about__flower-2"
        />
        <img src="/assets/img/leaf-1.svg" alt="image" class="about__leaf" />

        <h2 class="about__text">日本</h2>
      </div>

      <div class="about__images">
        <div class="about__blob"></div>

        <img src="/assets/img/about-img.png" alt="image" class="about__img" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__container {
  row-gap: 3rem;
  padding-bottom: 3rem;
}

.about__data {
  position: relative;
  text-align: center;
}

.about__description {
  margin-bottom: 2rem;
}

.about__data img,
.about__text {
  position: absolute;
}

.about__flower-1 {
  width: 20px;
  top: 0.5rem;
  right: 2rem;
}

.about__flower-2 {
  width: 20px;
  left: 2rem;
  bottom: 2rem;
}

.about__leaf {
  width: 30px;
  right: 2rem;
  bottom: 4rem;
}

.about__text {
  bottom: -4rem;
  left: 0;
  right: 0;
  font-size: 10rem;
  font-weight: var(--font-medium);
  color: var(--body-color-alt);
  z-index: -1;
}

.about__images {
  position: relative;
  justify-self: center;
}

.about__blob {
  width: 200px;
  height: 320px;
  background-color: var(--first-color);
  border-radius: 1rem;
  margin-left: 4rem;
}

.about__img {
  position: absolute;
  max-width: initial;
  width: 230px;
  top: 0;
  bottom: 0;
  margin-block: auto;
  right: 2rem;
}

/* For small devices <> */
@media screen and (width <= 320px) {
  .about__text {
    font-size: 8rem;
  }
}

/* For medium devices <> */
@media screen and (width <= 540px) {
  .about__container {
    grid-template-columns: 400px;
    justify-content: center;
  }
}

/* For large devices <> */
@media screen and (width >= 1150px) {
  .about__container {
    grid-template-columns: 350px 530px;
    column-gap: 13rem;
    align-items: center;
    padding-block: 2rem 5rem;
  }

  .about__data {
    order: 1;
    text-align: initial;
  }

  .about__data :is(.section__title, .section__subtitle) {
    text-align: initial;
  }

  .about__description {
    margin-bottom: 3.5rem;
  }

  .about__flower-1 {
    width: 30px;
    right: 9rem;
  }

  .about__flower-2 {
    width: 30px;
    bottom: -5rem;
    left: 0;
  }

  .about__leaf {
    width: 40px;
    top: 0;
    bottom: 0;
    margin-block: auto;
  }

  .about__text {
    font-size: 17rem;
    white-space: nowrap;
    bottom: -9rem;
    left: -1.5rem;
  }

  .about__blob {
    width: 350px;
    height: 560px;
    margin-left: 0;
  }

  .about__img {
    width: 420px;
    right: -6rem;
  }
}
</style>
