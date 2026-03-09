<script setup>
import { onMounted } from "vue";
import { sr } from "@/libs/index";

const handleRevealSection = () => {
  sr.reveal(`.contact__data`, {
    interval: 100,
  });
  sr.reveal(`.contact__newsletter`, {
    delay: 600,
  });
  sr.reveal(`.contact__text-1`, {
    delay: 1200,
    origin: "top",
  });
  sr.reveal(`.contact__text-2`, {
    delay: 1500,
  });
};

onMounted(() => {
  handleRevealSection();
});
</script>

<template>
  <section class="contact section" id="contact">
    <h2 class="section__title">
      Contact Us And Order <br />
      The Best Sushi
    </h2>

    <div class="contact__container container grid">
      <h2 class="contact__text-1">
        日 <br />
        本
      </h2>
      <h2 class="contact__text-2">
        接 <br />
        触
      </h2>

      <div class="contact__content grid">
        <div class="contact__data">
          <h3 class="contact__title">Messages:</h3>

          <div class="contact__social">
            <a
              href="https://example.com"
              target="_blank"
              class="contact__social-link"
            >
              <i class="ri-messenger-line"></i>
            </a>

            <a
              href="https://example.com"
              target="_blank"
              class="contact__social-link"
            >
              <i class="ri-whatsapp-line"></i>
            </a>

            <a
              href="mailto:example@gmail.com"
              target="_blank"
              class="contact__social-link"
            >
              <i class="ri-mail-line"></i>
            </a>
          </div>
        </div>

        <div class="contact__data">
          <h3 class="contact__title">Location:</h3>

          <address class="contact__address">
            Lima - Peru <br />
            Av. The Trees #0123
          </address>
        </div>

        <div class="contact__data">
          <h3 class="contact__title">Phone:</h3>

          <address class="contact__address">
            +0123(00)-765-4321 <br />
            +00-0123456
          </address>
        </div>

        <div class="contact__data">
          <h3 class="contact__title">Attention:</h3>

          <address class="contact__address">
            Monday - Friday <br />
            8am - 6pm
          </address>
        </div>
      </div>

      <div class="contact__newsletter grid">
        <p class="contact__description">Subscribe to the newsletter</p>

        <form action="" class="contact__form">
          <input
            type="email"
            placeholder="Enter your email address"
            class="contact__input"
          />
          <button class="contact__button button">Subcribe</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background-color: var(--first-color);
}

.contact .section__title {
  color: var(--white-color);
  margin-bottom: 2rem;
}

.contact__container {
  position: relative;
  row-gap: 5rem;
  padding-bottom: 3rem;
  color: var(--white-color);
}

.contact__text-1,
.contact__text-2 {
  position: absolute;
  font-size: 6rem;
  font-weight: var(--font-medium);
  color: var(--first-color-alt);
}

.contact__text-1 {
  top: -6rem;
  left: 0;
}

.contact__text-2 {
  right: 0;
  bottom: 3rem;
}

.contact__content {
  z-index: 10;
  grid-template-columns: repeat(2, max-content);
  justify-content: center;
  gap: 2rem 3rem;
}

.contact__data {
  text-align: center;
}

.contact__title {
  color: var(--white-color);
  font-size: var(--small-font-size);
  margin-bottom: 0.25rem;
}

.contact__social {
  display: flex;
  justify-content: center;
  column-gap: 0.75rem;
}

.contact__social-link {
  color: var(--white-color);
  font-size: 1.5rem;
}

.contact__address {
  font-size: var(--small-font-size);
  font-size: initial;
}

.contact__newsletter {
  z-index: 10;
  row-gap: 1rem;
  text-align: center;
}

.contact__description {
  font-size: var(--small-font-size);
}

.contact__form {
  width: 90%;
  margin: 0 auto;
  background-color: hsla(358, 54%, 98%, 0.2);
  padding: 0.75rem;
  border: 2px solid var(--white-color);
  border-radius: 4rem;
  display: flex;
  justify-content: space-between;
}

.contact__input {
  width: 100%;
  background: none;
  color: var(--white-color);
  font-size: var(--small-font-size);
  padding-left: 0.5rem;
  padding-right: 1rem;
}

.contact__input::placeholder {
  color: var(--white-color);
}

.contact__button {
  background-color: var(--white-color);
  color: var(--first-color);
  padding: 0.75rem 1rem;
  font-size: var(--small-font-size);
  border-radius: 4rem;
  cursor: pointer;
}

.contact__button:hover {
  background-color: var(--white-color);
}

/* For small devices <> */
@media screen and (width <= 320px) {
  .contact__content {
    grid-template-columns: max-content;
  }
}

/* For medium devices <> */
@media screen and (width <= 540px) {
  .contact__container {
    grid-template-columns: 400px;
    justify-content: center;
  }
}

/* For large devices <> */
@media screen and (width >= 1150px) {
  .contact .section__title {
    margin-bottom: 3.5rem;
  }

  .contact__text-1,
  .contact__text-2 {
    font-size: 10rem;
    top: -13rem;
  }

  .contact__content {
    grid-template-columns: repeat(4, max-content);
    column-gap: 6rem;
  }

  .content__title {
    font-size: var(--normal-font-size);
    margin-bottom: 1rem;
  }

  .contact__social {
    column-gap: 1rem;
  }

  .contact__address,
  .contact__description {
    font-size: var(--normal-font-size);
  }

  .contact__form {
    width: 450px;
  }

  .contact__input {
    font-size: var(--normal-font-size);
    padding-left: 0.75rem;
  }

  .contact__button {
    padding: 1rem 1.5rem;
    font-size: var(--normal-font-size);
  }
}
</style>
