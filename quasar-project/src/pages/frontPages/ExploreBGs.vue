<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { api } from 'src/boot/axios'
import Swal from 'sweetalert2'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { getAllBoardgames } = boardgameStore
const { boardgames } = storeToRefs(boardgameStore)

</script>

<template lang="pug">
q-page#exploreBGs(padding)
  section.q-mx-auto
    .container
      .row.q-gutter-md
       .col(v-for="boardgame in boardgames" :key="boardgame._id")
        BoardgameCard(v-bind="boardgame")
</template>
