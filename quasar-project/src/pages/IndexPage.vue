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

// Swiper
const modules = [Navigation, Pagination, Autoplay]
</script>

<template>
  <q-page id="index">
    <section class="hero flex flex-center">
      <div class="row">
        <div class="inner_container col-12">
          <div class="banner_content text-center">
            <div class="text-h3 text-weight-bold">WELCOME TO</div>
            <br />
            <div class="text-h3 text-weight-bold">揪遊Lego</div>
          </div>
        </div>
        <div class="video_container col-12">
          <video
            class="intro_video"
            src="../assets/intro.mp4"
            autoplay
            loop
            muted
          />
        </div>
        <div class="btn_area col-12 flex flex-center q-gutter-md q-mt-lg">
              <div>
                <q-btn
                  class="hero_btn"
                  to="/reservation"
                  label="RESERVATION"
                ></q-btn>
              </div>
              <div>
                <q-btn class="hero_btn" to="/teamup" label="TEAMUP"></q-btn>
              </div>
        </div>
      </div>

    </section>

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
            data-aos="fade-up-right"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            桌上遊戲，讓我們拉近人與人的距離。
          </p>
          <p
            class="about_content col-12 q-pt-md text-h6 text-weight-medium text-center"
            data-aos="fade-up-left"
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

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 flex flex-center" style="margin-top: 150px;">
            <div class="title text-h6" data-aos="fade-up"
              data-aos-duration="1000">WHAT YOU LOOKING FOR</div>
          </div>
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
              class="subtitle text-h4"
            >
              Board Games
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
                  }
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
              class="subtitle text-h4"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Teamups
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
                  }
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

    <!-- FAQ -->
    <section id="faq_section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div
              class="text-center"
              data-aos="fade-up"
              data-aos-duration="2500"
            >
              <div class="faq text-h6">FAQs</div>
            </div>
            <div class="content">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- contact us -->
    <section>
      <div class="row">
        <div class="col-12">
          <div class="col-6"></div>
          <div class="col-6"></div>
        </div>
      </div>
    </section>

  </q-page>
</template>

<style lang="scss">
#index {
  overflow-x: hidden;

  .container {
    .title {
      display: inline-block;
      font-weight: 900;
      border-bottom: 1px solid #fff;
      padding-bottom: 2px;
    }

    .subtitle {
      border-left: 15px solid $primary;
      padding-left: 1rem;
    }

    .content {
      margin: 2rem 0 4.5rem 0;
    }
  }

  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../assets/mask.png') no-repeat center/100% 100%;
    // background-size: cover;

    .inner_container {
      display: table;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
      position: relative;
      z-index: 2;
      text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);

      .banner_content {
        display: table-cell;
        vertical-align: middle;
      }
    }

    .video_container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;

      .intro_video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .hero_btn {
      width: 200px;
      color: #fff;
      border: 1px solid #fff;

      &:hover {
        color: $dark;
        background-color: #fff;
        transition: 0.5s;
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
