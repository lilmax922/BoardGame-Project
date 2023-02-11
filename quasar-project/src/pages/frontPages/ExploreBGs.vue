<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { api } from 'src/boot/axios'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { getAllBoardgames } = boardgameStore
const { boardgames } = storeToRefs(boardgameStore)
console.log(boardgames.value)
</script>

<template lang="pug">
q-page#exploreBGs(padding)
  section.q-mx-auto
    .container
      .row.q-gutter-md
       .col-3(v-for="boardgame in boardgames" :key="boardgame._id")
        BoardgameCard(v-bind="boardgame")
        p {{ types }}
</template>
