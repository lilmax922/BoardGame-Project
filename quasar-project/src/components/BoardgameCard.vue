<script setup>
import { ref } from 'vue'

const imageSrc = ref('../assets/images/bg-type/strategy/璀璨寶石/璀璨寶石1.jpg')

</script>

<template lang="pug">
q-card.bg-card(flat)
  q-img(src="../assets/images/bg-type/strategy/璀璨寶石/璀璨寶石1.jpg")
  q-card-section.q-gutter-sm
    .type-tag #策略 #陣營 #心機
    p.text-h4 璀璨寶石 Splendor
  q-card-section.flex-center(horizontal)
    q-card-section.col-8
      q-list
        q-item
          q-item-section
            q-icon(name="mdi-account-multiple" size="xs") &nbsp;4 ~ 7 人
        q-item
          q-item-section
            q-icon(name="mdi-clock" size="xs") &nbsp;約 30 分鐘
    q-card-section.col-4.flex-center
      q-btn.more-btn(color="primary") 查看更多
</template>

<style lang="scss">
.bg-card {
  width: 350px;
  .more-btn {
    width: 90px;
  }
}
</style>
