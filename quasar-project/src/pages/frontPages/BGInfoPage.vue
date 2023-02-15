<script setup>
import { reactive } from 'vue'
import { api } from 'src/boot/axios'

const boardgame = reactive({
  _id: '',
  name: '',
  cardImage: '',
  mainImage: '',
  types: '',
  players: '',
  gameTime: 5,
  age: 4,
  ytVideo: '',
  componentImages: '',
  componentTexts: '',
  setup: '',
  gameFlow: '',
  endGame: '',
  post: true
})
</script>

<template>
  <q-page id="bg-info" padding>
    <div class="q-ma-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <q-breadcrumbs-el label="探索桌遊" to="/exploreBGs" />
        <q-breadcrumbs-el label="123"  />
      </q-breadcrumbs>
    </div>
    <div class="container">
      <div class="info">
        <div id="introduce">
          <div class="header text-h6">遊戲介紹</div>
        </div>
      </div>
      <div class="images"></div>
    </div>
  </q-page>
</template>
