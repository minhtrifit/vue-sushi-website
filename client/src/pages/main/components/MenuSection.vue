<script setup>
import { onMounted, computed, watch, nextTick, ref } from "vue";
import Swiper from "swiper";
import { Thumbs } from "swiper/modules";
import { sr } from "@/libs/index";
import { useShowcaseCategory } from "@/composables/useShowcaseCategory";
import { useShowcaseFood } from "@/composables/useShowcaseFood";

const { data: categoriesData } = useShowcaseCategory();
const { fetch: fetchFood } = useShowcaseFood();

const selectedCategory = ref("");
const foods = ref([]);

const categories = computed(() => {
  const res = categoriesData.value;

  if (!res?.success) return [];

  return res?.data?.data?.map((cate) => ({
    id: cate.id,
    title: cate.name,
    url: cate.imageUrl,
  }));
});

const menusByCategory = computed(() => {
  const result = {};

  categories.value.forEach((cate) => {
    result[cate.id] = foods.value.filter((m) => m.categoryId === cate.id);
  });

  return result;
});

const handleInitSlider = () => {
  const swiperTabs = new Swiper(".menu__tabs", {
    slidesPerView: "auto",
    watchSlidesProgress: true,
  });

  const swiperMenu = new Swiper(".menu__content", {
    modules: [Thumbs],
    loop: true,
    thumbs: {
      swiper: swiperTabs,
    },
  });
};

const handleRevealSection = () => {
  sr.reveal(`.menu__button`, {
    interval: 100,
  });
  sr.reveal(`.menu__content`, {
    delay: 600,
  });
  sr.reveal(`.menu__text-1`, {
    delay: 900,
    origin: "top",
  });
  sr.reveal(`.menu__text-2`, {
    delay: 1200,
  });
};

const handleFilterFood = (categoryId) => {
  selectedCategory.value = categoryId;
};

const handleViewFood = (food) => {
  console.log(food);
};

// Init category
watch(
  categories,
  async (val) => {
    if (!val.length) return;

    await nextTick();
    handleInitSlider();

    // set init selected category
    selectedCategory.value = val[0].id;
  },
  { immediate: true },
);

// Init/Update food
watch(
  selectedCategory,
  async (val) => {
    if (!val) return;

    const res = await fetchFood(val);

    if (!res?.data?.success) return;

    const data = res?.data?.data?.data?.map((food) => {
      return {
        ...food,
      };
    });

    foods.value = data;
  },
  { immediate: true },
);

onMounted(() => {
  handleRevealSection();
});
</script>

<template>
  <section class="menu section" id="menu">
    <h2 class="section__title">Our Menu</h2>

    <div class="menu__container container">
      <h2 class="menu__text-1">
        寿 <br />
        司
      </h2>
      <h2 class="menu__text-2">
        拉 <br />
        麺
      </h2>

      <div class="menu__tabs swiper" thumbsSlider="">
        <div class="menu__buttons swiper-wrapper">
          <button
            :key="category.id"
            class="menu__button swiper-slide"
            v-for="category in categories"
            @click="handleFilterFood(category.id)"
          >
            <img :src="category.url" alt="image" />
            <span>{{ category.title }}</span>
          </button>
        </div>
      </div>

      <div class="menu__content swiper">
        <div class="swiper-wrapper">
          <div
            v-for="category in categories"
            :key="category.id"
            class="menu__cards swiper-slide"
          >
            <!-- v-for="(value, key, index) in object" -->
            <article
              v-for="food in menusByCategory[category.id]"
              :key="food.id"
              class="menu__card"
              @click="handleViewFood(food)"
            >
              <div class="menu__blob">
                <img :src="food.imageUrl" class="menu__img" />
              </div>

              <h2 class="menu__name">{{ food.name }}</h2>

              <div class="menu__info">
                <h3 class="menu__price">${{ food.price }}</h3>
                <span class="menu__stock"> {{ food.stock }} available </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu {
  min-height: 959px;
  background-color: var(--first-color);
}

.menu .section__title {
  color: var(--white-color);
  margin-bottom: 1.5rem;
}

.menu__container {
  position: relative;
  padding-bottom: 3rem;
}

.menu__text-1,
.menu__text-2 {
  position: absolute;
  font-size: 10rem;
  font-weight: var(--font-medium);
  color: var(--first-color-alt);
}

.menu__text-1 {
  top: -4rem;
  left: 0;
}

.menu__text-2 {
  right: 0;
  bottom: 4rem;
}

.menu__tabs,
.menu__content {
  position: relative;
  z-index: 10;
}

.menu__button {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  background-color: hsla(358, 60%, 58%, 0.4);
  color: var(--white-color);
  border: 2px solid var(--white-color);
  border-radius: 4rem;
  cursor: pointer;
  transition:
    background-color 0.4s,
    color 0.4s;
}

.menu__button img {
  width: 30px;
}

.menu__button:hover {
  background-color: var(--white-color);
  color: var(--first-color);
}

.menu__cards {
  display: grid;
  grid-template-columns: 238px;
  justify-content: center;
  gap: 1.5rem;
}

.menu__card {
  background-color: hsla(358, 54%, 98%, 0.2);
  padding: 1.5rem;
  border-radius: 1rem;
  transition: background-color 0.4s;
}

.menu__blob {
  width: 190px;
  height: 190px;
  background-color: hsla(358, 54%, 98%, 0.2);
  border-radius: 1rem;
  display: grid;
  place-items: center;
  transition: background-color 0.4s;
}

.menu__img {
  width: 120px;
}

.menu__name,
.menu__price,
.menu__stock {
  color: var(--white-color);
  transition: color 0.4s;
}

.menu__name {
  font-size: var(--h2-font-size);
  text-align: center;
  margin-block: 1.25rem 0.75rem;
}

.menu__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu__price {
  font-size: var(--h2-font-size);
}

.menu__stock {
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
}

.menu__card:hover {
  background-color: var(--white-color);
}

.menu__card:hover .menu__blob {
  background-color: var(--gray-color);
}

.menu__card:hover .menu__name {
  color: var(--title-color);
}

.menu__card:hover .menu__price {
  color: var(--first-color);
}

.menu__card:hover .menu__stock {
  color: var(--text-color);
}

/* Swiper class */
.menu__tabs {
  overflow: initial;
}

.menu__tabs .swiper-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.menu__tabs .swiper-slide {
  width: initial;
  height: initial;
}

.menu__tabs .swiper-slide-thumb-active {
  background-color: var(--white-color);
  color: var(--first-color);
}

/* For large devices <> */
@media screen and (width >= 1150px) {
  .menu .section__title {
    margin-bottom: 2rem;
  }

  .menu__container {
    padding-bottom: 6rem;
  }

  .menu__text-1 {
    top: -8rem;
    font-size: 12rem;
  }

  .menu__text-2 {
    bottom: 0;
    font-size: 12rem;
  }

  .menu__tabs .swiper-wrapper {
    column-gap: 1.5rem;
    margin-bottom: 6rem;
  }

  .menu__button {
    padding: 0.5rem 1rem;
    font-size: var(--normal-font-size);
  }

  .menu__cards {
    grid-template-columns: repeat(3, 304px);
    column-gap: 4rem;
  }

  .menu__card {
    padding: 2rem 2rem 2.5rem;
  }

  .menu__blob {
    width: 240px;
    height: 240px;
  }

  .menu__img {
    width: 150px;
  }

  .menu__name {
    font-size: 1.75rem;
  }
}
</style>
