<script setup>
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { Swal } from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const slide = ref(1)
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
})

boardgame.types.map((type) => {
  return console.log(type)
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
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品失敗'
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
        <q-breadcrumbs-el label="探索桌遊" to="/exploreBGs" />
        <q-breadcrumbs-el :label="boardgame.name" />
      </q-breadcrumbs>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="info-area q-mb-lg">
            <div class="introduce column">
              <div class="header text-h4 q-pb-md">遊戲介紹</div>
              <div class="text-h3">{{ boardgame.name }}</div>
              <div v-html="boardgame.introduction" />
              <div class="flex items-center">
                <q-icon name="mdi-google-downasaur" />
                <div v-for="type in boardgame.types" :key="type">
                  &num;{{ type }}&nbsp;
                </div>
              </div>
              <div>
                <q-icon name="mdi-account-group" />
                {{ boardgame.players }} 人
              </div>
              <div>
                <q-icon name="mdi-timer-sand" />
                約 {{ boardgame.gameTime }} 分鐘
              </div>
            </div>
          </div>
          <div class="component-area q-mb-lg">
            <div class="component column">
              <div class="header text-h4 q-pb-md">內容物介紹</div>
              <div class="carousel">###內容物圖片</div>
              <div v-html="boardgame.componentTexts" />
            </div>
          </div>
          <div class="gameflow-area q-mb-lg">
            <div class="gameflow column">
              <div class="header text-h4 q-pb-md">遊戲流程</div>
              <div v-html="boardgame.gameFlow" />
            </div>
          </div>
          <div class="endgame-area q-mb-lg">
            <div class="endgame column">
              <div class="header text-h4 q-pb-md">遊戲結束</div>
              <div v-html="boardgame.endGame" />
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="mainImages-area">
            <q-carousel swipeable animated v-model="slide" thumbnails infinite>
              <q-carousel-slide
                v-for="(boardgame, i) in boardgame.mainImages"
                :key="i"
                :name="boardgame"
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
    border: 1px solid #fff;
    border-radius: 16px;
    padding: 1.5rem;
    & {
      font-size: 18px;
    }
  }
}
</style>
