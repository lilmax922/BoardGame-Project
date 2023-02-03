<template lang="pug">
q-page.flex.flex-center
  //- img(alt='Quasar logo' src='~assets/quasar-logo-vertical.svg' style='width: 200px; height: 200px')
  q-img(alt="BG hero" src="../assets/images/hero/Mix.jpg" style="max-width: 100%;")
</template>

<script setup>
import { ref } from 'vue'

const name = ref('HomePage')

</script>
