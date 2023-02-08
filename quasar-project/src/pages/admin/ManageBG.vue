<script setup>
import { apiAuth } from 'src/boot/axios'
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { isValidUrl, getVideoId } from 'is-youtube-url'

const $q = useQuasar()

const bgTypes = reactive({
  camp: false,
  strategy: false,
  abstract: false,
  crafty: false,
  card: false,
  party: false,
  family: false,
  children: false
})
const playerRange = ref({
  min: 1,
  max: 4
})
const boardgames = reactive([])
const bgForm = reactive({
  _id: '', // 空的代表新增，有東西代表編輯
  introduction: '',
  name: '',
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
  valid: false,
  loading: false,
  dialog: false,
  index: -1
})

// > q-table
const columns = [
  {
    name: 'image',
    label: 'Image',
    field: 'mainImages',
    align: 'left',
    sortable: true
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
    sortable: true
  },
  {
    name: 'types',
    label: 'Types',
    field: 'types',
    align: 'center',
    sortable: true
  },
  {
    name: 'ytVideo',
    label: 'YoutubeId',
    field: 'ytVideo',
    align: 'center',
    sortable: true
  },
  {
    name: 'post',
    label: 'Posted',
    field: 'post',
    align: 'center',
    sortable: true
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
  if (index === -1) {
    // -1 = 新增
    bgForm._id = ''
    bgForm.introduction = ''
    bgForm.name = ''
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
    bgForm.valid = false
    bgForm.loading = false
    bgForm.index = -1
  } else {
    bgForm._id = boardgames[index]._id
    bgForm.introduction = boardgames[index].introduction
    bgForm.name = boardgames[index].name
    bgForm.mainImages = boardgames[index].mainImages
    bgForm.types = boardgames[index].types
    bgForm.gameTime = boardgames[index].gameTime
    bgForm.age = boardgames[index].age
    bgForm.ytVideo = boardgames[index].ytVideo
    bgForm.componentImages = boardgames[index].componentImages
    bgForm.componentTexts = boardgames[index].componentTexts
    bgForm.setup = boardgames[index].setup
    bgForm.gameFlow = boardgames[index].gameFlow
    bgForm.endGame = boardgames[index].endGame
    bgForm.post = boardgames[index].post
    bgForm.valid = false
    bgForm.loading = false
    bgForm.index = index
    playerRange.value.min = boardgames[index].players.splice('~')[0]
    playerRange.value.max = boardgames[index].players.splice('~')[1]
  }
  bgForm.dialog = true
}

const onSubmit = async () => {
  // if (!bgForm.valid) return

  bgForm.loading = true

  const fd = new FormData()
  // fd.append(key, value)
  fd.append('introduction', bgForm.introduction)
  fd.append('name', bgForm.name)
  for (const i of bgForm.mainImages) {
    fd.append('mainImages', i)
  }
  for (const i of bgForm.types) {
    fd.append('types', i)
  }
  // fd.append('players', bgForm.players)
  const players = `${playerRange.value.min} ~ ${playerRange.value.max}`
  fd.append('players', players)
  fd.append('gameTime', bgForm.gameTime)
  fd.append('age', bgForm.age)
  fd.append('ytVideo', getVideoId(bgForm.ytVideo))
  for (const i of bgForm.componentImages) {
    console.log(i)
    fd.append('componentImages', i)
  }
  fd.append('componentTexts', bgForm.componentTexts)
  fd.append('setup', bgForm.setup)
  fd.append('gameFlow', bgForm.gameFlow)
  fd.append('endGame', bgForm.endGame)
  fd.append('post', bgForm.post)

  try {
    if (bgForm._id.length === 0) {
      const { data } = await apiAuth.post('/boardgames', fd)
      console.log(fd.getAll('componentTexts'))
      console.log(data.result)
      boardgames.push(data.result)
      $q.notify({
        color: 'accent',
        textColor: 'white',
        icon: 'mdi-robot-happy',
        message: '桌遊新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/boardgames' + bgForm._id, fd)
      boardgames[bgForm.index] = data.result
      $q.notify({
        color: 'accent',
        textColor: 'white',
        icon: 'mdi-robot-happy',
        message: '桌遊編輯成功'
      })
      bgForm.loading = false
    }
  } catch (error) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'fa-solid fa-face-sad-tear',
      message: error?.response?.data?.message || '發生錯誤'
    })
  }
  bgForm.loading = false
}

;(async () => {
  try {
    const { data } = await apiAuth.get('/boardgames/all')
    boardgames.push(...data.result)
  } catch (error) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'fa-solid fa-face-sad-tear',
      message: error?.response?.data?.message || '發生錯誤'
    })
  }
})()
</script>

<template lang="pug">
q-page#edit-bgs
  .container.q-mx-xl
    .row
      .col-12.flex.items-center
        h4.q-pr-xl 桌遊管理
        q-btn.add-bg(@click="openDialog(-1)" label="新增桌遊" color="primary")
      .col-12
        // > 桌遊表單
        q-table(title="Boardgames" :rows="boardgames" :columns="columns" row-key="_id")
          //- template(v-slot:body-cell-image="props")
          //-   pre {{ props }}
          //-   q-img(:src="props.row.mainImages.children")
    // > 新增/編輯商品 dialog
    // ! types 沒吃到，但有成功送出
    q-dialog(v-model="bgForm.dialog" full-width persistent)
      q-layout(container)
        q-card(flat)
          q-form(v-model="bgForm.valid" @submit="onSubmit")
            q-card-section.flex.justify-end
              q-btn(push icon="mdi-close" v-close-popup)
            .text-h4.text-center {{ bgForm._id.length > 0 ? '編輯桌遊' : '新增桌遊' }}
            //- (horizontal)
            q-card-section.justify-center()
              q-card-section.col6
                // > 桌遊名稱
                .text-h6 桌遊名稱
                q-input(v-model="bgForm.name" filled label="請輸入桌遊名稱" clearable clear-icon="close" :rules="[rules.required]")
                // > 桌遊介紹
                .text-h6 桌遊介紹
                q-input(v-model="bgForm.introduction" filled autogrow label="請輸入桌遊介紹" clearable :rules="[rules.required]")
                // > 桌遊圖片
                .text-h6 桌遊圖片
                q-file(filled v-model="bgForm.mainImages" label="請選擇圖片" use-chips multiple)
                  template(v-slot:prepend)
                    q-icon(name="attach_file")
                // > YtVideo
                // ! 影片沒抓到資料 資料庫是 null
                .text-h6.q-pt-md Youtube教學影片
                q-input(v-model="bgForm.ytVideo" type="url" filled label="請輸入影片網址" clearable :rules="[rules.isYtUrl]")
                // > 遊戲時間 & 適合年齡
                q-item
                  q-item-section.items-center
                    .text-h6 遊戲時間
                    q-input(v-model="bgForm.gameTime" type="number" filled suffix="分鐘")
                  q-item-section.items-center
                    .text-h6 適合年齡
                    q-input(v-model="bgForm.age" type="number" filled suffix="歲")
                // > 桌遊類型
                div.row.items-center
                  .text-h6.q-mr-sm 桌遊類型?
                  .text-subtitle1 (可複選)
                div.q-gutter-lg
                  q-checkbox(size="lg" v-model="bgTypes.camp" label="陣營")
                  q-checkbox(size="lg" v-model="bgTypes.strategy" label="策略")
                  q-checkbox(size="lg" v-model="bgTypes.abstract" label="益智")
                  q-checkbox(size="lg" v-model="bgTypes.crafty" label="心機")
                  q-checkbox(size="lg" v-model="bgTypes.card" label="卡牌")
                  q-checkbox(size="lg" v-model="bgTypes.party" label="派對")
                  q-checkbox(size="lg" v-model="bgTypes.family" label="家庭")
                  q-checkbox(size="lg" v-model="bgTypes.children" label="兒童")
                // > 遊玩人數
                q-item
                  .text-h6 遊玩人數
                q-item.items-start
                  q-item-section(avatar)
                    q-icon(name="mdi-account-group" size="md")
                  q-item-section
                    q-range(v-model="playerRange" :min="1" :max="20" label)
                    p(color="secondary") {{ playerRange.min }} ~ {{ playerRange.max }} 人
              q-card-section.col-6
                // > 內容物介紹
                .text-h6 內容物介紹
                q-input(v-model="bgForm.componentTexts" filled autogrow label="請輸入內容物介紹" clearable :rules="[rules.required]")
                // > 內容物圖片
                .text-h6 內容物圖片
                q-file(filled v-model="bgForm.componentImages" label="選擇圖片" use-chips multiple)
                  template(v-slot:prepend)
                    q-icon(name="attach_file")
                //- q-separator(inset spaced)
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
            q-card-action.flex.justify-center.q-pb-md.q-gutter-md
              q-btn(label='取消' @click="bgForm.dialog = false" :disable="bgForm.loading")
              q-btn(label='送出' color='primary' type="submit" :disable="bgForm.loading")
</template>

<style lang="scss" scoped>
// .add-bg {
//   width: 100px;
//   height: 35px;
// }
</style>
