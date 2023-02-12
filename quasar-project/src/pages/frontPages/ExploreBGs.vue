<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { api } from 'src/boot/axios'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { boardgames } = storeToRefs(boardgameStore)
</script>

<!-- <template lang="pug">
q-page#exploreBGs
  .container
    .flex.items-center
      .text-h3.q-pr-md(style="display:inline-block") 探索桌遊
      q-btn(label="我要預約" to="/reservation" color="primary")
    div.q-mt-lg.flex.column
      div.q-gutter-md(v-for="boardgame in boardgames" :key="boardgame._id")
        BoardgameCard.col-8(v-bind="boardgame")
      div
        q-input(name="search")
</template> -->

<template>
  <q-page id="exploreBGs" padding>
    <div class="container">
      <section class="flex items-center">
        <div class="text-h3 q-pr-lg" style="display: inline-block">
          探索桌遊
        </div>
        <q-btn label="我要預約" to="/reservation" color="primary" />
      </section>
      <section id="page-body" class="flex">
        <div id="cards-container">
          <div v-for="boardgame in boardgames" :key="boardgame._id">
            <BoardgameCard v-bind="boardgame" />
          </div>
        </div>
        <div id="search-container">
          <q-input name="search" placeholder="搜尋" rounded outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#page-body {
  width: 100%;
  #cards-container {
    width: 85%;
  }
  #search-container {
    width: 15%;
  }
}
</style>
