<script setup>
import { ref } from 'vue'

const imageSrc = ref('../assets/images/bg-type/strategy/璀璨寶石/璀璨寶石1.jpg')

const lorem = ref('555')
</script>

<template lang="pug">
q-card.full-height.bg-card(flat)
  q-img(src="../assets/images/bg-type/strategy/璀璨寶石/璀璨寶石1.jpg")
  q-card-section.q-gutter-sm
    .type-tag #策略 #陣營 #心機
    p.text-h3 璀璨寶石 Splendor
  q-card-section(horizontal)
    q-card-section.col-8.column
      q-icon(name="fa-solid fa-envelope") {{ lorem }}
      q-icon(name="fa-solid fa-envelope") {{ lorem }}
    q-card-section.col-4
      q-btn(flat color="primary") 查看更多
</template>

<style>

</style>
