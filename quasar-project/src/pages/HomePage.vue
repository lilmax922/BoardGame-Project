<script setup>
import { ref } from 'vue'
import BoardgameCard from 'src/components/BoardgameCard.vue'
import TeamupCard from 'src/components/TeamupCard.vue'
import TestComp from 'src/components/TestComp.vue'

const name = ref('HomePage')
</script>

<template lang="pug">
q-page#home.flex.flex-center
  // q-img(alt="BG hero" src="../assets/images/hero/Mix.jpg" style="max-width: 100%;")

  TestComp
  //- BoardgameCard
  //- TeamupCard
</template>
