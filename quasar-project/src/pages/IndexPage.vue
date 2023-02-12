<script setup>
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import Swal from 'sweetalert2'
import BoardgameCard from 'src/components/BoardgameCard.vue'
import TeamupCard from 'src/components/TeamupCard.vue'
import TestComp from 'src/components/TestComp.vue'

</script>

<template lang="pug">
q-page#index
  section.q-mb-md
    q-img#hero(alt="BoardgameHero" src="../assets/images/hero/mix.jpg")
  .container
    section#everyone-play
      .text-h4 大家都在玩
</template>

<style lang="scss" scoped>
#index {
  #hero {
    height: 75vh;
  }
}
</style>
