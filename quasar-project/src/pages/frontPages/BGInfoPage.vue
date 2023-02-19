<script setup>
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { Swal } from 'sweetalert2'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const slide = ref(0) // q-carousel，它跟 carousel 的 :name 綁定
const carouselSlide = ref([0, 0])
const boardgame = reactive({
  _id: '',
  introduction: '',
  name: '',
  cardImage: '',
  mainImages: [],
  types: [],
  players: '',
  gameTime: 5,
  age: 4,
  ytVideo: '',
  componentImages: [],
  componentTexts: '',
  setup: '',
  gameFlow: '',
  endGame: '',
  post: true
});

// 取桌遊資料
(async () => {
  try {
    const { data } = await api.get('/boardgames/' + route.params.id)
    boardgame._id = data.result._id
    boardgame.introduction = data.result.introduction
    boardgame.name = data.result.name
    boardgame.cardImage = data.result.cardImage
    boardgame.mainImages = data.result.mainImages
    boardgame.types = data.result.types
    boardgame.players = data.result.players
    boardgame.gameTime = data.result.gameTime
    boardgame.age = data.result.age
    boardgame.ytVideo = data.result.ytVideo
    boardgame.componentImages = data.result.componentImages
    boardgame.componentTexts = data.result.componentTexts
    boardgame.setup = data.result.setup
    boardgame.gameFlow = data.result.gameFlow
    boardgame.endGame = data.result.endGame
    boardgame.post = data.result.post

    // 使用者可以看到 title 變更，但對爬蟲沒用
    document.title = '差滴滴 | ' + boardgame.name
  } catch (error) {
    $q.notify({
      position: 'top',
      message: error?.response?.data?.message || '發生錯誤',
      color: 'negative'
    })
    router.go(-1)
  }
})()
</script>

<template>
  <q-page id="bg-info" padding>
    <div class="q-ma-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <template #separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>
        <q-breadcrumbs-el label="探索桌遊" to="/exploreBGs" />
        <q-breadcrumbs-el :label="boardgame.name" />
      </q-breadcrumbs>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="info-area q-mb-lg">
            <div class="introduce column">
              <div class="header text-h4 q-mb-md">遊戲介紹</div>
              <div class="text-h3">{{ boardgame.name }}</div>
              <div v-html="boardgame.introduction" />
              <div class="icon_area flex column q-gutter-lg-md text-h6">
                <div class="flex items-center">
                  <q-icon
                    class="q-mr-sm"
                    name="mdi-google-downasaur"
                    size="sm"
                  />
                  <q-chip
                    class="type_tag"
                    v-for="(type, i) in boardgame.types"
                    :key="i"
                    color="secondary"
                    text-color="white"
                    size="md"
                  >
                    &#35;{{ type }}
                  </q-chip>
                </div>
                <div>
                  <q-icon name="mdi-account-group" size="sm" />
                  {{ boardgame.players }} 人
                </div>
                <div>
                  <q-icon name="mdi-timer-sand" size="sm" />
                  約 {{ boardgame.gameTime }} 分鐘
                </div>
              </div>
            </div>
          </div>
          <div class="component-area q-mb-lg">
            <div class="component column">
              <div class="header text-h4 q-mb-md">內容物介紹</div>
              <div class="component_carousel">
                <q-carousel
                  swipeable
                  animated
                  v-model="carouselSlide[0]"
                  thumbnails
                  infinite
                >
                  <q-carousel-slide
                    v-for="(boardgame, i) in boardgame.componentImages"
                    :key="i"
                    :name="i"
                    :img-src="boardgame"
                  />
                </q-carousel>
              </div>
              <div class="q-mt-lg" v-html="boardgame.componentTexts" />
            </div>
          </div>
          <div class="gameflow-area q-mb-lg">
            <div class="gameflow column">
              <div class="header text-h4 q-mb-md">遊戲流程</div>
              <div v-html="boardgame.gameFlow" />
            </div>
          </div>
          <div class="endgame-area q-mb-lg">
            <div class="endgame column">
              <div class="header text-h4 q-mb-md">遊戲結束</div>
              <div v-html="boardgame.endGame" />
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="mainImages-area">
            <q-carousel
              swipeable
              animated
              v-model="carouselSlide[1]"
              thumbnails
              infinite
            >
              <q-carousel-slide
                v-for="(boardgame, i) in boardgame.mainImages"
                :key="i"
                :name="i"
                :img-src="boardgame"
              />
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
#bg-info {
  .info-area,
  .component-area,
  .gameflow-area,
  .endgame-area {
    width: 98%;
    border: 1px solid #fff;
    background-color: #303030;
    border-radius: 16px;
    padding: 2rem;
  }
  .header {
    border-left: 15px solid $accent;
    padding-left: 1rem;
    color: $accent;
    margin-bottom: 2rem;
  }

  .component_carousel {
    margin: 1rem 0 1rem 0;
    border-radius: 16px;
    width: 80%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .mainImages-area {
    position: sticky;
    top: 50px;
    width: 98%;
    border: 1px solid #fff;
    border-radius: 16px;
  }
  .q-carousel {
    border-radius: 16px;
  }
}
</style>
