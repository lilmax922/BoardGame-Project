<script setup>
import { apiAuth } from 'src/boot/axios'
import { ref, reactive } from 'vue'

const inputText = ref('')
const files = ref(null)
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
const form = reactive({
  gameTime: 0,
  age: 0
})
const playerRange = ref({
  min: 0,
  max: 4
})

// > 以上是 dialog區

const boardgames = reactive([])
const bgForm = reactive({
  _id: '', // 空的代表新增，有東西代表編輯
  post: false,
  introduction: '',
  name: '',
  images: undefined,
  types: '',
  players: '',
  gameTime: 0,
  age: 0,
  ytVideo: '',
  components: '',
  setup: '',
  gameFlow: '',
  endGame: '',
  valid: false,
  loading: false,
  dialog: false
})

const openDialog = (index) => {
  // if (index === -1) {
  //   bgForm._id = ''
  //   bgForm.post = false
  //   bgForm.introduction = ''
  //   bgForm.name = ''
  //   bgForm.images = undefined
  //   bgForm.types = ''
  //   bgForm.players = ''
  //   bgForm.gameTime = 0
  //   bgForm.age = 0
  //   bgForm.ytVideo = ''
  //   bgForm.components = ''
  //   bgForm.setup = ''
  //   bgForm.gameFlow = ''
  //   bgForm.endGame = ''
  //   bgForm.valid = false
  //   bgForm.loading = false
  // } else {
  //   bgForm._id = boardgames[index]._id
  //   bgForm.post = boardgames[index].post
  //   bgForm.introduction = boardgames[index].introduction
  //   bgForm.name = boardgames[index].name
  //   bgForm.images = boardgames[index].images
  //   bgForm.types = boardgames[index].types
  //   bgForm.players = boardgames[index].players
  //   bgForm.gameTime = boardgames[index].gameTime
  //   bgForm.age = boardgames[index].age
  //   bgForm.ytVideo = boardgames[index].ytVideo
  //   bgForm.components = boardgames[index].components
  //   bgForm.setup = boardgames[index].setup
  //   bgForm.gameFlow = boardgames[index].gameFlow
  //   bgForm.endGame = boardgames[index].endGame
  //   bgForm.valid = false
  //   bgForm.loading = false
  // }
  bgForm.dialog = true
}

const submit = async () => {
  if (!bgForm.valid) return
}
</script>

<template lang="pug">
q-page#edit-bgs
  .container.q-mx-xl
    .row
      .col-12.flex.items-center
        h4.q-pr-xl 桌遊管理
        q-btn.add-bg(@click="openDialog()" label="新增桌遊" dense color="primary")
      .col-12
        q-table
    q-dialog(v-model="bgForm.dialog" full-width full-height persistent)
      q-layout
        q-form(v-model="bgForm.valid" @submit="submit")
          q-card
            q-card-section
              q-btn(push)
                q-icon(name="mdi-close" v-close-popup)
            q-card-section
              // > 桌遊名稱
              q-item
                q-item-section
                  .text-h6 桌遊名稱
                  q-input(filled dense)
              // > 桌遊圖片
              q-item
                q-item-section
                  .text-h6 桌遊圖片
                  q-file(filled dense v-model="files" label="選擇圖片" use-chips multiple)
                    template(v-slot:prepend)
                      q-icon(name="attach_file")
              // > 桌遊介紹
              q-item
                q-item-section
                  .text-h6 桌遊介紹
                  q-input(filled dense autogrow)
              // > 桌遊類型
              q-item
                q-item-section
                  div.row.items-center
                    .text-h6.q-mr-sm 桌遊類型?
                    .text-subtitle1 (可複選)
                  div.q-gutter-sm
                    q-checkbox(dense size="xl" v-model="bgTypes.camp" label="陣營")
                    q-checkbox(dense size="xl" v-model="bgTypes.strategy" label="策略")
                    q-checkbox(dense size="xl" v-model="bgTypes.abstract" label="益智")
                    q-checkbox(dense size="xl" v-model="bgTypes.crafty" label="心機")
                    q-checkbox(dense size="xl" v-model="bgTypes.card" label="卡牌")
                    q-checkbox(dense size="xl" v-model="bgTypes.party" label="派對")
                    q-checkbox(dense size="xl" v-model="bgTypes.family" label="家庭")
                    q-checkbox(dense size="xl" v-model="bgTypes.children" label="兒童")
              // > 遊玩人數
              q-item
                q-item-section.items-center
                  .text-h6 遊玩人數
              q-item.items-start
                q-item-section(avatar)
                  q-icon(name="mdi-account-group" size="md")
                q-item-section
                  q-range(v-model="playerRange" :min="0" :max="20" label).
                  p(color="secondary") {{ playerRange.min }} ~ {{ playerRange.max }} 人
              // > 遊戲時間 & 適合年齡
              q-item
                q-item-section.items-center
                  .text-h6 遊戲時間
                  q-input(v-model="form.gameTime" type="number" filled suffix="分鐘")
                q-item-section.items-center
                  .text-h6 適合年齡
                  q-input(v-model="form.age" type="number" filled suffix="歲")
              q-separator
              // > 內容物介紹
              q-item
                q-item-section
                  .text-h6 內容物介紹
                  q-input(filled dense autogrow)
              // > 內容物圖片
              q-item
                q-item-section
                    .text-h6 內容物圖片
                    q-file(filled dense v-model="files" label="選擇圖片" use-chips multiple)
                      template(v-slot:prepend)
                        q-icon(name="attach_file")
              q-separator
              // > 遊戲流程
              q-item
                q-item-section
                  .text-h6 遊戲流程
                  q-input(filled dense autogrow)
              // > 遊戲結束
              q-item
                q-item-section
                  .text-h6 遊戲結束
                  q-input(filled dense autogrow)
            q-separator(inset)
            q-card-action
              q-btn(flat label='送出' color='primary' type="submit")
</template>

<style lang="scss" scoped>
// .add-bg {
//   width: 100px;
//   height: 35px;
// }
</style>
