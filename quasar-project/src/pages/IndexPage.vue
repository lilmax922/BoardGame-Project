<script setup>
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BoardgameCard from 'src/components/BoardgameCard.vue'
import TeamupCard from 'src/components/TeamupCard.vue'
import TestComp from 'src/components/TestComp.vue'
import FaqAccordion from 'src/components/FaqAccordion.vue'

const $q = useQuasar()

const boardgames = reactive([])
const slide = ref(1)

// ;(async () => {
//   try {
//     const { data } = api.get('/boardgames')
//     boardgames.push(...data.result)
//   } catch (error) {
//     $q.notify({
//       message: '失敗',
//       caption: error?.response?.data?.message || '發生錯誤',
//       color: 'secondary'
//     })
//   }
// })()
</script>

<template>
  <q-page id="index">
    <div class="hero q-mb-md">
      <div class="glass row">
        <div class="title col-12 text-h3">關於我們</div>
        <div class="content col-12 q-pt-md text-h6">
          在這個科技冷漠的世代，我們希望成為一個讓人們聚在一起，享受桌遊樂趣的地方，並透過桌遊這個媒介，讓人們能夠在日常生活中找到快樂和樂趣。
        </div>
      </div>
    </div>

    <div class="container">
      <section id="section01">
        <div class="row">
          <div class="col-12">
            <div class="text-h4">大家都在玩</div>
            <swiper class="height" data-aos="fade-up" :modules="modules" :spaceBetween="40" :slidesPerView="'auto'">
              <swiper-slide v-for="i in boardgames" :key="i">
                <BoardgameCard v-bind="i" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </section>

      <section id="section02">
        <div class="row">
          <div class="col-12">
            <div class="text-h4">常見問題</div>
            <div>
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#index {
  .hero {
    position: relative;
    height: 75vh;
    background: url("../assets/images/hero/mix1.png") no-repeat;
    background-size: cover;

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
}
</style>
