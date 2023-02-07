<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive } from 'vue'

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
    q-dialog(v-model="bgForm.dialog")
      q-input
</template>

<style lang="scss" scoped>
// .add-bg {
//   width: 100px;
//   height: 35px;
// }
</style>
