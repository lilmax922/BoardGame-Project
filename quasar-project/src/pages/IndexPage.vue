<script setup>
import { ref } from 'vue'
import BoardgameCard from 'src/components/BoardgameCard.vue'
import TeamupCard from 'src/components/TeamupCard.vue'
import TestComp from 'src/components/TestComp.vue'

const name = ref('HomePage')
</script>

<template lang="pug">
q-page#index
  q-section
    q-img(alt="BoardgameHero" src="../assets/images/hero/Mix.jpg")
  q-section
</template>
