<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive } from 'vue'

const bgForm = reactive({
  _id: '',
  post: false,
  introduction: '',
  name: '',
  images: undefined,
  types: '',
  player: ''
})
</script>

<template lang="pug">
q-page#edit-bgs
  .container.q-mx-xl
    .row
      .col-12
        h4 編輯桌遊
        q-btn(@click="openDialog" label="新增桌遊" color="primary" style="max-width:90px")
    q-dialog(v-model="")
</template>

<style lang="scss" scoped>

</style>
