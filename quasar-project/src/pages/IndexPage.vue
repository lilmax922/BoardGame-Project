<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AOS from 'aos'
import '../../node_modules/aos/dist/aos.css'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import { useTeamupStore } from 'src/stores/teamup'
import BoardgameCard from 'src/components/BoardgameCard.vue'
import TeamupCard from 'src/components/TeamupCard.vue'
import TestComp from 'src/components/TestComp.vue'
import FaqAccordion from 'src/components/FaqAccordion.vue'

AOS.init()

const $q = useQuasar()
const boardgameStore = useBoardgameStore()
const teamupStore = useTeamupStore()
const { getPostBoardgames } = boardgameStore
const { getAllTeamups } = teamupStore
const { boardgames } = storeToRefs(boardgameStore)
const { teamups } = storeToRefs(teamupStore)

getPostBoardgames()
getAllTeamups()

// computed
// const filterTeamups = computed(() => {
//   return teamups.value.filter((item) => item.types.includes('抽象'))
// })

// Swiper
const modules = [Navigation, Pagination, Autoplay]
</script>

<template>
  <q-page id="index">
    <div class="hero flex flex-center">
      <div class="container">
        <div class="text-center">
          <p class="hero-title text-h2">
            Board games bring people closer together.
          </p>
          <div class="flex flex-center q-gutter-md q-mt-lg">
            <div>
              <q-btn
                class="hero_btn"
                to="/reservation"
                label="我要預約"
              ></q-btn>
            </div>
            <div>
              <q-btn class="hero_btn" to="/teamup" label="我要揪團"></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="about_section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <p
              class="about text-h6"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              關於揪遊Lego
            </p>
          </div>
          <p
            class="about_title col-12 text-h5 text-accent text-center text-weight-bold"
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            桌上遊戲，讓我們拉近人與人的距離。
          </p>
          <p
            class="about_content col-12 q-pt-md text-h6 text-weight-medium text-center"
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            一個能夠聚在一起享受桌遊樂趣的地方，透過桌遊，讓人們能夠在揪遊Lego獲得快樂和樂趣。
          </p>
        </div>
      </div>
    </section>

    <!-- 店內桌遊 parallax -->
    <section>
      <div class="row">
        <div class="col-12">
          <q-parallax src="../assets/店內桌遊.jpg"> </q-parallax>
        </div>
      </div>
    </section>

    <!-- 桌遊 -->
    <section id="boardgame_section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div
              data-aos="fade-right"
              data-aos-duration="1500"
              class="title text-h4"
            >
              大家都在<span class="text-accent">玩</span>
            </div>
            <!-- boardgame Swiper Area -->
            <div class="content">
              <Swiper
                class="mySwiper"
                :modules="modules"
                :navigation="true"
                :autoplay="{
                  delay: 3000,
                  disableOnInteraction: false,
                }"
                :loop="true"
                :slidesPerView="1"
                :spaceBetween="30"
                :breakpoints="{
                  '576': {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  '768': {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  '1024': {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  '1200': {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }"
              >
                <SwiperSlide v-for="i in boardgames" :key="i">
                  <BoardgameCard v-bind="i" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 揪團 -->
    <section id="teamup_section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div
              class="title text-h4"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              大家都在<span class="text-accent">揪</span>
            </div>
            <div class="content">
              <Swiper
                class="mySwiper"
                :modules="modules"
                :navigation="true"
                :autoplay="{
                  delay: 3000,
                  disableOnInteraction: false,
                }"
                :loop="true"
                :slidesPerView="1"
                :spaceBetween="30"
                :breakpoints="{
                  '576': {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  '768': {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  '1024': {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  '1200': {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }"
              >
                <SwiperSlide v-for="i in teamups" :key="i">
                  <TeamupCard v-bind="i" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section>
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <div>本期EVENT</div>
                      </div>
                    </div>
                  </div>
                </section> -->

    <!-- FAQ -->
    <section id="faq_section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div
              class="text-center"
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              <div class="faq text-h6">常見問題</div>
            </div>
            <div class="content">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </div>
    </section>

      <section>
        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/25OpgUg5qCI" frameborder="0" allowfullscreen></iframe>
        </div>
      </section>
  </q-page>
</template>

<style lang="scss">
#index {
  .hero {
    position: relative;
    width: 100%;
    height: 75vh;
    background: url("../assets/images/hero/boardgames-banner-image.png")
      no-repeat;
    background-size: cover;
    background-position: 50%;

    .hero-title {
      font-weight: 700;
    }

    .hero_btn {
      width: 200px;
      color: #fff;
      border: 1px solid #fff;

      &:hover {
        transition: 0.5s;
        color: $dark;
        background-color: #fff;
      }
    }

    .hero_content {
      color: $textColor;
    }

    .glass {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 35%;
      padding: 1rem;
      backdrop-filter: blur(10px);
      background: linear-gradient(
        135deg,
        rgba($color: #fff, $alpha: 0.1),
        rgba($color: #fff, $alpha: 0)
      );
      border-radius: 16px;
      border: 1px solid rgba($color: #fff, $alpha: 0.18);
      box-shadow: 0 8px 32px 0 rgba($color: $dark, $alpha: 0.37);

      .reservation_btn {
        color: $dark;
        background-color: rgba($color: $primary, $alpha: 0.65);
        border-radius: 8px;
        box-shadow: 0 8px 32px 0 rgba($color: $dark, $alpha: 0.37);

        &:hover {
          transition: 0.5s;
          background-color: rgba($color: $dark, $alpha: 0.65);
          color: $primary;
          border: 1px solid $primary;
        }
      }
    }
  }

  .container {
    .title {
      border-left: 15px solid $primary;
      padding-left: 1rem;
      // text-align: center;
      // border-bottom: 1px solid #fff;
      // padding-bottom: 2px;
      // display: inline-block;
    }

    .content {
      margin: 2rem 0 4.5rem 0;
    }
  }

  .faq {
    font-weight: 900;
    border-bottom: 1px solid #fff;
    padding-bottom: 2px;
    display: inline-block;
  }

  #about_section {
    margin: 150px 0;

    .row {
      width: 100%;
      justify-content: center;
      gap: 1.5rem;

      .about {
        display: inline-block;
        font-weight: 900;
        border-bottom: 1px solid #fff;
        padding-bottom: 2px;
      }

      .about_title,
      .about_content {
        color: $textColor;
      }
    }
  }

  #boardgame_section {
    margin-top: 50px;
  }
}
</style>
