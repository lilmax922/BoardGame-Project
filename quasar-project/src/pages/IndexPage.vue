<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import { useTeamupStore } from 'src/stores/teamup'
import BoardgameCard from 'src/components/BoardgameCard.vue'
import TeamupCard from 'src/components/TeamupCard.vue'
import TestComp from 'src/components/TestComp.vue'
import FaqAccordion from 'src/components/FaqAccordion.vue'

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
const modules = [Navigation, Pagination]
</script>

<template>
  <q-page id="index">
    <div class="hero">
      <!-- <div class="glass row">
            <div class="title col-12 text-h3">關於我們</div>
            <div class="content col-12 q-pt-md text-h6">
              在這個科技冷漠的世代，我們希望成為一個讓人們聚在一起，享受桌遊樂趣的地方，並透過桌遊這個媒介，讓人們能夠在日常生活中找到快樂和樂趣。
            </div>
          </div> -->
    </div>

    <section id="about_section">
      <div class="container">
        <div class="row">
          <div class="about_title text-h5">關於揪遊Lego</div>
          <p class="about_content col-12 q-pt-md text-h6 text-center">
            在這個科技冷漠的世代，我們希望成為一個讓人們聚在一起，享受桌遊樂趣的地方，並透過桌遊這個媒介，讓人們能夠在日常生活中找到快樂和樂趣。
          </p>
        </div>
      </div>
    </section>

    <!-- <div class="container"> -->

    <!-- 桌遊 -->
    <section id="section01">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="title text-h4">
              大家都在<span class="text-accent">玩</span>
            </div>
            <!-- boardgame Swiper Area -->
            <div class="content">
              <Swiper class="mySwiper" :modules="modules" :navigation="true" :pagination="true" :slidesPerView="1"
                :spaceBetween="30" :breakpoints="{
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
                }">
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
    <section id="section02">
      <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title text-h4">
            大家都在<span class="text-accent">揪</span>
          </div>
          <div class="content">
            <Swiper class="mySwiper" :modules="modules" :navigation="true" :pagination="true" :slidesPerView="1"
              :spaceBetween="30" :breakpoints="{
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
              }">
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
    <section>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="title text-h4">常見問題</div>
            <div class="content">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- </div> -->
  </q-page>
</template>

<style lang="scss">
#index {
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("../assets/images/hero/mix1.png") no-repeat;
    background-size: cover;
    background-position: 50%;

    .glass {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 35%;
      padding: 1rem;
      backdrop-filter: blur(10px);
      background: linear-gradient(135deg,
          rgba($color: #fff, $alpha: 0.1),
          rgba($color: #fff, $alpha: 0));
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

  #about_section {
    margin: 150px 0;

    .row {
      width: 100%;
      display: flex;
      justify-content: center;

      .about_title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 900;
        border-bottom: 1px solid #fff;
        padding-bottom: 2px;
      }

      .about_content {
        display: flex;
        max-width: 750px;
        margin-top: 100px;
        color: $text-color;
        font-weight: 700;
      }
    }
  }

  .container {
    .title {
      border-left: 15px solid $primary;
      padding-left: 1rem;
    }

    .content {
      margin: 2rem 0 4.5rem 0;
    }
  }
}
</style>
