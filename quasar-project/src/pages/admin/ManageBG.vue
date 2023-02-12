<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import VImageInput from 'vue3-img-input'
import { isValidUrl, getVideoId } from 'is-youtube-url'
import { useBoardgameStore } from 'stores/boardgame'

const boardgameStore = useBoardgameStore()
const { deleteBoardgame, submitBoardgame } = boardgameStore
const { boardgames } = storeToRefs(boardgameStore)

const bgTypes = reactive({
  camp: {
    type: false,
    label: '陣營'
  },
  strategy: {
    type: false,
    label: '策略'
  },
  abstract: {
    type: false,
    label: '抽象'
  },
  crafty: {
    type: false,
    label: '心機'
  },
  card: {
    type: false,
    label: '卡牌'
  },
  party: {
    type: false,
    label: '派對'
  },
  family: {
    type: false,
    label: '家庭'
  },
  children: {
    type: false,
    label: '兒童'
  }

})
const playerRange = ref({
  min: 1,
  max: 4
})
const bgForm = reactive({
  _id: '', // 空的代表新增，有東西代表編輯
  introduction: '',
  name: '',
  cardImage: undefined,
  mainImages: [],
  types: [],
  players: '',
  gameTime: 0,
  age: 0,
  ytVideo: '',
  componentImages: [],
  componentTexts: '',
  setup: '',
  gameFlow: '',
  endGame: '',
  post: false,
  loading: false,
  dialog: false,
  index: -1
})

// > q-table
const filter = ref('')
const columns = [
  {
    name: 'image',
    label: '圖片',
    field: row => row.cardImage,
    align: 'center'
  },
  {
    name: 'name',
    label: '桌遊名稱',
    field: row => row.name,
    align: 'center',
    sortable: true
  },
  {
    name: 'types',
    label: '類型',
    field: row => row.types,
    align: 'center',
    sortable: true
  },
  {
    name: 'ytVideo',
    label: 'YT影片ID',
    field: row => row.ytVideo,
    align: 'center',
    sortable: true
  },
  {
    name: 'post',
    label: '張貼',
    field: row => row.post,
    align: 'center',
    sortable: true
  },
  {
    name: 'edit',
    label: '編輯',
    field: row => row.edit,
    align: 'center'
  }
]

const rules = ({
  required (value) {
    return (value && value.length > 0) || '欄位必填'
  },
  isYtUrl (url) {
    return (isValidUrl(url) || 'Youtube 網址錯誤')
  }
})

const openDialog = (index) => {
  // 被 pinia 引用的值要加 value
  const idx = boardgames.value.findIndex((boardgame) => boardgame._id === index)
  if (index === -1) {
    // -1 = 新增
    bgForm._id = ''
    bgForm.introduction = ''
    bgForm.name = ''
    bgForm.cardImage = undefined
    bgForm.mainImages = []
    bgForm.types = []
    bgForm.players = ''
    bgForm.gameTime = 0
    bgForm.age = 0
    bgForm.ytVideo = ''
    bgForm.componentImages = []
    bgForm.componentTexts = ''
    bgForm.setup = ''
    bgForm.gameFlow = ''
    bgForm.endGame = ''
    playerRange.value.min = 1
    playerRange.value.max = 4
    bgForm.post = false
    bgForm.loading = false
    bgForm.index = -1
  } else {
    // ! 卡片圖
    bgForm._id = boardgames.value[idx]._id
    bgForm.introduction = boardgames.value[idx].introduction
    bgForm.name = boardgames.value[idx].name
    bgForm.cardImage = boardgames.value[idx].cardImage
    console.log(bgForm.cardImage) // 回傳 https://res.cloudinary.com/dyvwqnaip/image/upload/v1675944044/rlnpcele9hgjivk9azon.jpg
    bgForm.mainImages = boardgames.value[idx].mainImages
    bgForm.types = boardgames.value[idx].types
    bgForm.gameTime = boardgames.value[idx].gameTime
    bgForm.age = boardgames.value[idx].age
    bgForm.ytVideo = `https://www.youtube.com/watch?v=${boardgames.value[idx].ytVideo}`
    bgForm.componentImages = boardgames.value[idx].componentImages
    bgForm.componentTexts = boardgames.value[idx].componentTexts
    bgForm.setup = boardgames.value[idx].setup
    bgForm.gameFlow = boardgames.value[idx].gameFlow
    bgForm.endGame = boardgames.value[idx].endGame
    bgForm.post = boardgames.value[idx].post
    bgForm.loading = false
    bgForm.idx = idx
    playerRange.value.min = boardgames.value[idx].players.split('~')[0]
    playerRange.value.max = boardgames.value[idx].players.split('~')[1]
  }
  bgForm.dialog = true
}

const onSubmit = async () => {
  bgForm.loading = true

  const fd = new FormData()
  // fd.append(key, value)
  fd.append('introduction', bgForm.introduction)
  fd.append('name', bgForm.name)
  fd.append('cardImage', bgForm.cardImage)
  for (const i of bgForm.mainImages) {
    fd.append('mainImages', i)
  }
  const typesArray = Object.entries(bgTypes)
  typesArray.forEach((item) => {
    if (item[1].type) {
      fd.append('types', item[1].label)
    }
  })
  const players = `${playerRange.value.min} ~ ${playerRange.value.max}`
  fd.append('players', players)
  fd.append('gameTime', bgForm.gameTime)
  fd.append('age', bgForm.age)
  fd.append('ytVideo', getVideoId(bgForm.ytVideo))
  for (const i of bgForm.componentImages) {
    fd.append('componentImages', i)
  }
  fd.append('componentTexts', bgForm.componentTexts)
  fd.append('setup', bgForm.setup)
  fd.append('gameFlow', bgForm.gameFlow)
  fd.append('endGame', bgForm.endGame)
  fd.append('post', bgForm.post)
  await submitBoardgame(fd, bgForm._id)
  bgForm.loading = false
  bgForm.dialog = false
}
</script>

<template lang="pug">
q-page#edit-bgs
  .container.q-mx-xl
    .row
      .col-12.flex.items-center
        h4.q-pr-xl 桌遊管理
        q-btn(@click="openDialog(-1)" label="新增桌遊" color="primary")
      .col-12
        // > 桌遊表單
        q-table(title="Boardgames" :rows="boardgames" :columns="columns" row-key="_id" :filter="filter" :rows-per-page-options="[5,10,15,0]")

          template(v-slot:top-right)
            q-input(debounce="300" v-model="filter" placeholder="Search")
              template(v-slot:append)
                q-icon(name="search")

          template(v-slot:body-cell-image="props")
            q-img(:src="props.row.cardImage")

          template(v-slot:body-cell-post="props")
            q-td.text-center
              q-toggle(v-model="props.row.post" color="accent")

          template(v-slot:body-cell-edit="props")
            q-td.text-center.q-gutter-sm
              q-btn(icon="edit" color="info" fab-mini unelevated size="sm" @click="openDialog(props.row._id)")
              q-btn(icon="delete" color="secondary" fab-mini unelevated @click="deleteBoardgame(props.row._id)")
    // > 新增/編輯商品 dialog
    q-dialog(v-model="bgForm.dialog" full-width persistent)
      q-layout(container)
        q-card(flat)
          q-form(@submit="onSubmit")
            q-card-section.flex.justify-end
              q-btn(push icon="mdi-close" v-close-popup)
            .text-h4.text-center {{ bgForm._id.length > 0 ? '編輯桌遊' : '新增桌遊' }}
            q-card-section.justify-center
              q-card-section
                // > 桌遊名稱
                .text-h6 桌遊名稱
                q-input(v-model="bgForm.name" filled label="請輸入桌遊名稱" clearable clear-icon="close" :rules="[rules.required]")
                // > 桌遊介紹
                .text-h6 桌遊介紹
                q-input(v-model="bgForm.introduction" filled autogrow label="請輸入桌遊介紹" clearable :rules="[rules.required]")
                // > 桌遊卡片圖
                .text-h6 桌遊卡片圖
                q-file(filled v-model="bgForm.cardImage" label="請選擇卡片圖(單選)")
                  template(v-slot:prepend)
                    q-icon(name="attach_file")
                div.row.q-pa-md
                  q-card
                    q-img(v-if="bgForm.cardImage" :src="bgForm.cardImage" width="100px")
                // > 桌遊主圖
                .text-h6 桌遊主圖
                q-file(filled v-model="bgForm.mainImages" label="請選擇主圖片(可複選)" use-chips multiple)
                  template(v-slot:prepend)
                    q-icon(name="attach_file")
                div.row.q-pa-md
                  q-card.q-mr-sm(v-for="mainImage in bgForm.mainImages" :key="mainImage")
                    q-img(:src="mainImage" width="100px")
                // > YtVideo
                .text-h6.q-pt-md Youtube教學影片
                q-input(v-model="bgForm.ytVideo" type="url" filled label="請輸入影片網址" clearable :rules="[rules.isYtUrl]")
                // > 遊戲時間 & 適合年齡
                q-item
                  q-item-section.items-center
                    .text-h6 遊戲時間
                    q-input(v-model.number="bgForm.gameTime" type="number" filled suffix="分鐘")
                  q-item-section.items-center
                    .text-h6 適合年齡
                    q-input(v-model.number="bgForm.age" type="number" filled suffix="歲")
                // > 桌遊類型
                div.row.items-center
                  .text-h6.q-mr-sm 桌遊類型?
                  .text-subtitle1 (可複選)
                div.q-gutter-lg
                  q-checkbox(size="lg" v-model="bgTypes.camp.type" :label="bgTypes.camp.label")
                  q-checkbox(size="lg" v-model="bgTypes.strategy.type" :label="bgTypes.strategy.label")
                  q-checkbox(size="lg" v-model="bgTypes.abstract.type" :label="bgTypes.abstract.label")
                  q-checkbox(size="lg" v-model="bgTypes.crafty.type" :label="bgTypes.crafty.label")
                  q-checkbox(size="lg" v-model="bgTypes.card.type" :label="bgTypes.card.label")
                  q-checkbox(size="lg" v-model="bgTypes.party.type" :label="bgTypes.party.label")
                  q-checkbox(size="lg" v-model="bgTypes.family.type" :label="bgTypes.family.label")
                  q-checkbox(size="lg" v-model="bgTypes.children.type" :label="bgTypes.children.label")
                // > 遊玩人數
                q-item
                  .text-h6 遊玩人數
                q-item.items-start
                  q-item-section(avatar)
                    q-icon(name="mdi-account-group" size="md")
                  q-item-section
                    q-range(v-model="playerRange" :min="1" :max="20" label)
                    p(color="secondary") {{ playerRange.min }} ~ {{ playerRange.max }} 人
              q-card-section
                // > 內容物介紹
                .text-h6 內容物介紹
                q-input(v-model="bgForm.componentTexts" filled autogrow label="請輸入內容物介紹" clearable :rules="[rules.required]")
                // > 內容物圖片
                .text-h6 內容物圖片
                //- VImageInput(v-model="bgForm.componentImages")
                q-file(filled v-model="bgForm.componentImages" label="選擇圖片(可複選)" use-chips multiple)
                  template(v-slot:prepend)
                    q-icon(name="attach_file")
                div.row.q-pa-md
                  q-card.q-mr-sm(v-for="componentImages in bgForm.componentImages" :key="componentImages")
                    q-img(:src="componentImages" width="100px")
                // > 遊戲配置
                .text-h6 遊戲配置
                q-input(v-model="bgForm.setup" filled autogrow label="請輸入遊戲配置" clearable :rules="[rules.required]")
                // > 遊戲流程
                .text-h6 遊戲流程
                q-input(v-model="bgForm.gameFlow" filled autogrow label="請輸入遊戲流程" clearable :rules="[rules.required]")
                // > 遊戲結束
                .text-h6 遊戲結束
                q-input(v-model="bgForm.endGame" filled autogrow label="請輸入遊戲結束說明" clearable :rules="[rules.required]")
                // > 張貼桌遊
                q-checkbox.q-mt-md(label="張貼桌遊" v-model="bgForm.post" size="lg" :rules="[rules.required]")
            q-card-actions.flex.justify-center.q-pb-md.q-gutter-md
              q-btn(label='取消' @click="bgForm.dialog = false" :disable="bgForm.loading")
              q-btn(label='送出' color='primary' type="submit" :disable="bgForm.loading")
</template>

<style lang="scss" scoped>
</style>
