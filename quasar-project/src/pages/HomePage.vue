<script setup>
import { ref } from 'vue'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const name = ref('HomePage')
</script>

<template lang="pug">
q-page#home.flex.flex-center
  //- img(alt='Quasar logo' src='~assets/quasar-logo-vertical.svg' style='width: 200px; height: 200px')
  //- q-img(alt="BG hero" src="../assets/images/hero/Mix.jpg" style="max-width: 100%;")
  BoardgameCard
</template>
