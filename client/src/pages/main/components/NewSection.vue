<script setup>
import { onMounted, reactive, watch } from "vue";
import { get } from "lodash";
import { sr } from "@/libs/index";
import { formatNewLineToBr } from "@/helpers/index";
import { SECTION_TYPE } from "@/constants";
import { useSectionByType } from "@/composables/useSectionByType";

const { data, loading, error } = useSectionByType(SECTION_TYPE.SPECIAL);

const content = reactive({
  mainTitle: "",
  subTitle: "",
  content: "",
});

const handleRevealSection = () => {
  sr.reveal(`.new__data .section__title`);
  sr.reveal(`.new__data .section__subtitle`, {
    delay: 600,
  });
  sr.reveal(`.new__description`, {
    delay: 900,
  });
  sr.reveal(`.new__blob`, {
    delay: 900,
    origin: "right",
  });
  sr.reveal(`.new__images img`, {
    delay: 1200,
    distance: 0,
    interval: 200,
    scale: 0,
  });
  sr.reveal(`.new__data img`, {
    delay: 1500,
    distance: 0,
    interval: 200,
    scale: 0,
  });
  sr.reveal(`.new__text-1`, {
    delay: 2100,
  });
  sr.reveal(`.new__text-2`, {
    delay: 2400,
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
  <section class="new section" id="new">
    <div class="new__container container grid">
      <div class="new__data">
        <span class="section__subtitle">Newly Added / 新しく追加された</span>

        <h2 class="section__title">
          <span v-html="formatNewLineToBr(get(content, 'mainTitle', ''))" />
          {{ " " }}
          <span v-html="formatNewLineToBr(get(content, 'subTitle', ''))" />
        </h2>

        <p class="new__description">
          {{ get(content, "content") }}
        </p>

        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="new__flower-1"
        />
        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="new__flower-2"
        />
        <img src="/assets/img/leaf-1.svg" alt="image" class="new__leaf-1" />
        <img src="/assets/img/leaf-2.svg" alt="image" class="new__leaf-2" />

        <h2 class="new__text-1">日本</h2>
      </div>

      <div class="new__images">
        <div class="new__blob"></div>

        <img src="/assets/img/new-img-1.png" alt="image" class="new__img-1" />
        <img src="/assets/img/new-img-2.png" alt="image" class="new__img-2" />
        <img src="/assets/img/new-img-3.png" alt="image" class="new__img-3" />
        <img src="/assets/img/new-img-4.png" alt="image" class="new__img-4" />
        <img src="/assets/img/new-img-5.png" alt="image" class="new__img-5" />

        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="new__flower-3"
        />
        <img
          src="/assets/img/flower-japan.svg"
          alt="image"
          class="new__flower-4"
        />
        <img src="/assets/img/leaf-3.svg" alt="image" class="new__leaf-3" />

        <h2 class="new__text-2">刺身料理</h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
.new__container {
  row-gap: 5rem;
  padding-bottom: 6rem;
}

.new__description {
  line-height: normal;
}

.new__data {
  position: relative;
  text-align: center;
}

.new__data img,
.new__text-1 {
  position: absolute;
}

.new__flower-1 {
  width: 20px;
  top: 3rem;
  left: 0;
}

.new__flower-2 {
  width: 20px;
  left: 0;
  right: 0;
  bottom: -2rem;
  margin-inline: auto;
}

.new__leaf-1 {
  width: 30px;
  top: 0.5rem;
  right: 0;
}

.new__leaf-2 {
  width: 25px;
  bottom: -4rem;
  left: 0.5rem;
}

.new__text-1 {
  bottom: -8rem;
  left: 0;
  right: 0;
  font-size: 10rem;
  font-weight: var(--font-medium);
  color: var(--body-color-alt);
  z-index: -1;
}

.new__images {
  position: relative;
  justify-self: center;
}

.new__blob {
  width: 200px;
  height: 320px;
  background-color: var(--first-color);
  border-radius: 1rem;
  margin-left: 4rem;
}

.new__images img,
.new__text-2 {
  position: absolute;
}

.new__img-1 {
  width: 270px;
  right: 0;
  bottom: 0;
}

.new__img-2 {
  width: 200px;
  top: 2rem;
  right: 0;
}

.new__img-3 {
  width: 200px;
  top: -2rem;
  right: 1.5rem;
}

.new__img-4 {
  width: 50px;
  top: 9rem;
  right: 0.5rem;
}

.new__img-5 {
  width: 50px;
  right: 2.5rem;
  bottom: 0.5rem;
}

.new__flower-3 {
  width: 20px;
  top: 3rem;
  right: -2rem;
}

.new__flower-4 {
  width: 20px;
  bottom: -2rem;
  left: 6rem;
}

.new__leaf-3 {
  width: 25px;
  top: 10rem;
  left: 0.75rem;
}

.new__text-2 {
  bottom: -3rem;
  left: 0;
  font-size: 4rem;
  font-weight: var(--font-medium);
  color: var(--body-color-alt);
  z-index: -1;
}

/* For small devices <> */
@media screen and (width <= 320px) {
  .new__text-1 {
    font-size: 8rem;
  }
}

/* For medium devices <> */
@media screen and (width <= 540px) {
  .new__container {
    grid-template-columns: 400px;
    justify-content: center;
  }
}

/* For large devices <> */
@media screen and (width >= 1150px) {
  .new__container {
    grid-template-columns: 460px 350px;
    align-items: center;
    column-gap: 13rem;
    padding-block: 2rem 7rem;
  }

  .new__data,
  .new__data :is(.section__title, .section__subtitle) {
    text-align: initial;
  }

  .new__flower-1 {
    width: 30px;
    top: -5rem;
  }

  .new__flower-2 {
    width: 30px;
    left: initial;
    right: 8rem;
    bottom: -4rem;
  }

  .new__leaf-1 {
    width: 40px;
    top: -5.5rem;
    right: 4rem;
  }

  .new__leaf-2 {
    width: 35px;
    bottom: -7rem;
    left: 1rem;
  }

  .new__text-1 {
    font-size: 17rem;
    white-space: nowrap;
    bottom: -15rem;
    left: -2.5rem;
  }

  .new__blob {
    width: 350px;
    height: 560px;
    margin-left: 0;
  }

  .new__img-1 {
    max-width: initial;
    width: 500px;
    bottom: -1.5rem;
  }

  .new__img-2 {
    max-width: initial;
    width: 380px;
    top: 3.5rem;
  }

  .new__img-3 {
    width: 350px;
    top: -3.5rem;
    right: 3rem;
  }

  .new__img-4 {
    width: 90px;
    top: 15.5rem;
    right: 1rem;
  }

  .new__img-5 {
    width: 90%;
    right: 4rem;
  }

  .new__flower-3 {
    width: 30px;
    top: -3rem;
    right: 0.5rem;
  }

  .new__flower-4 {
    width: 30px;
    bottom: -5rem;
  }

  .new__leaf-3 {
    width: 35px;
    top: 21rem;
    left: -6rem;
  }

  .new__text-2 {
    font-size: 9rem;
    white-space: nowrap;
    left: -12rem;
    top: -4rem;
  }
}
</style>
