<script setup>
import { onMounted, reactive, watch } from "vue";
import { get } from "lodash";
import { sr } from "@/libs/index";
import { formatNewLineToBr } from "@/helpers/index";
import { SECTION_TYPE } from "@/constants";
import { useSectionByType } from "@/composables/useSectionByType";

const { data, loading, error } = useSectionByType(SECTION_TYPE.HOME);

const content = reactive({
  mainTitle: "",
  subTitle: "",
  content: "",
});

const handleRevealSection = () => {
  sr.reveal(`.home__title`, { origin: "top" });
  sr.reveal(`.home__description`, { delay: 600, origin: "top" });
  sr.reveal(`.home__data .button`, {
    delay: 900,
    distance: 0,
    scale: 0,
    origin: "top",
  });
  sr.reveal(`.home__blob`, { delay: 900, distance: "100px" });
  sr.reveal(`.home__images img`, {
    delay: 1200,
    distance: 0,
    interval: 200,
    scale: 0,
  });
  sr.reveal(`.home__data img`, {
    delay: 1500,
    distance: 0,
    interval: 200,
    scale: 0,
  });
  sr.reveal(`.home__text`, {
    delay: 2100,
    distance: "120px",
  });
};

watch(
  data,
  (res) => {
    if (!res?.success) return;

    Object.assign(content, res.data);
  },
  { immediate: true },
);

onMounted(() => {
  handleRevealSection();
});
</script>

<template>
  <section class="home section" id="home">
    <div class="home__container container grid">
      <div class="home__data">
        <h1 class="home__title">
          <span v-html="formatNewLineToBr(get(content, 'mainTitle', ''))" />
          {{ " " }}
          <span v-html="formatNewLineToBr(get(content, 'subTitle', ''))" />
        </h1>

        <p class="home__description">
          {{ get(content, "content") }}
        </p>

        <a href="#menu" class="button">Order Now</a>

        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="home__flower-1"
        />
        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="home__flower-2"
        />
        <img src="/assets/img/leaf-1.svg" alt="image" class="home__leaf-1" />
        <img src="/assets/img/leaf-1.svg" alt="image" class="home__leaf-2" />

        <h2 class="home__text">
          美 <br />
          味
        </h2>
      </div>

      <div class="home__images">
        <div class="home__blob"></div>

        <img src="/assets/img/home-img-1.png" alt="image" class="home__img-1" />
        <img src="/assets/img/home-img-2.png" alt="image" class="home__img-2" />
        <img src="/assets/img/home-img-3.png" alt="image" class="home__img-3" />
        <img src="/assets/img/home-img-4.png" alt="image" class="home__img-4" />
        <img src="/assets/img/home-img-5.png" alt="image" class="home__img-5" />
        <img src="/assets/img/home-img-6.png" alt="image" class="home__img-6" />

        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="home__flower-3"
        />
        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="home__flower-4"
        />
        <img src="/assets/img/leaf-2.svg" alt="image" class="home__leaf-3" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.home__container {
  min-height: 644px;
  padding-top: 1.5rem;
  row-gap: 3rem;
}

.home__data {
  position: relative;
  text-align: center;
}

.home__title {
  line-height: normal;
  font-size: var(--biggest-font-size);
}

.home__title span:nth-of-type(2) {
  color: var(--first-color);
}

.home__description {
  line-height: normal;
  margin-block: 1rem 2rem;
}

.home__data img,
.home__text {
  position: absolute;
}

.home__flower-1 {
  width: 20px;
  top: -1.5rem;
  left: 4rem;
}

.home__flower-2 {
  width: 20px;
  left: 1.25rem;
  bottom: 3rem;
}

.home__leaf-1 {
  width: 30px;
  top: 0;
  right: 0;
}

.home__leaf-2 {
  width: 30px;
  left: 4rem;
  bottom: -2rem;
}

.home__text {
  left: 0;
  top: -1.75rem;
  font-size: 12rem;
  font-weight: var(--font-medium);
  color: var(--body-color-alt);
  z-index: -1;
}

.home__images {
  position: relative;
  justify-self: center;
}

.home__blob {
  width: 300px;
  height: 300px;
  background-color: var(--first-color);
  border-radius: 50%;
  justify-self: center;
}

.home__images img {
  position: absolute;
}

.home__img-1 {
  width: 230px;
  left: -1.5rem;
  bottom: 3rem;
}

.home__img-2 {
  width: 120px;
  top: 0.5rem;
  left: 2rem;
}

.home__img-3 {
  width: 90px;
  top: 5rem;
  right: 3rem;
}

.home__img-4 {
  width: 60px;
  top: 1.25rem;
  right: 4.5rem;
}

.home__img-5 {
  width: 50px;
  right: 1.5rem;
  bottom: 7rem;
}

.home__img-6 {
  width: 150px;
  right: 4rem;
  bottom: -0.75rem;
}

.home__flower-3 {
  width: 20px;
  top: -1rem;
  right: 1rem;
}

.home__flower-4 {
  width: 20px;
  left: 0;
  bottom: 0;
}

.home__leaf-3 {
  width: 25px;
  right: 1rem;
  bottom: 1.5rem;
}

/*=============== BREAKPOINTS ===============*/
/* For small devices <> */
@media screen and (width <= 320px) {
  .home__blob {
    word-wrap: 280px;
    height: 280px;
  }
}

/* For medium devices <> */
@media screen and (width <= 540px) {
  .home__container {
    grid-template-columns: 400px;
    justify-content: center;
  }
}

/* For large devices <> */
@media screen and (width >= 1150px) {
  .home__container {
    grid-template-columns: 525px 580px;
    align-items: center;
    column-gap: 1rem;
    padding-top: 4rem;
  }

  .home__data {
    text-align: initial;
    margin-bottom: 4rem;
  }

  .home__description {
    margin: 1rem 3.5rem 3.5rem 0;
  }

  .home__flower-1 {
    width: 30px;
    top: -2.5rem;
    left: 1.5rem;
  }

  .home__flower-2 {
    width: 30px;
    left: 17rem;
    bottom: -3rem;
  }

  .home__leaf-1 {
    width: 40px;
    top: 0.5rem;
    right: 2.5rem;
  }

  .home__leaf-2 {
    width: 40px;
    top: initial;
    left: 2.5rem;
    bottom: -6rem;
  }

  .home__text {
    font-size: 17rem;
    top: -8rem;
  }

  .home__blob {
    width: 580px;
    height: 580px;
  }

  .home__img-1 {
    width: 460px;
    left: -5rem;
    bottom: 5rem;
  }

  .home__img-2 {
    width: 240px;
    top: 1rem;
    left: 4rem;
  }

  .home__img-3 {
    width: 180px;
    top: 10.5rem;
    right: 5.5rem;
  }

  .home__img-4 {
    width: 120px;
    top: 3rem;
    right: 8rem;
  }

  .home__img-5 {
    width: 100px;
    right: 2rem;
    bottom: 11rem;
  }

  .home__img-6 {
    width: 300px;
    right: 8rem;
    bottom: -4rem;
  }

  .home__flower-3 {
    width: 30px;
    right: 6.5rem;
  }

  .home__flower-4 {
    width: 30px;
    left: 1rem;
    bottom: 1.5rem;
  }

  .home__leaf-3 {
    width: 35px;
    bottom: 2.5rem;
  }
}
</style>
