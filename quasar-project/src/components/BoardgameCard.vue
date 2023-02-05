<script setup>
import { ref } from 'vue'

const imageSrc = ref('../assets/images/bg-type/strategy/璀璨寶石/璀璨寶石1.jpg')

</script>

<template lang="pug">
q-card.bg-card(flat)
  q-img(src="../assets/images/bg-type/strategy/璀璨寶石/璀璨寶石1.jpg")
  q-card-section.q-gutter-sm
    .type-tag #策略 #陣營 #心機
    .text-h4 璀璨寶石 Splendor
  q-card-section.flex-center(horizontal)
    q-card-section.col-8
      q-list
        q-item.q-pa-none
          q-item-section
            q-icon(name="mdi-account-multiple" size="xs")
          q-item-section &nbsp;4 ~ 7 人
        q-item.q-pa-none
          q-item-section.flex-auto
            q-icon(name="mdi-clock" size="xs")
          q-item-section &nbsp;約 30 分鐘
    q-card-section.col-4.q-pa-none
      q-btn.more-btn(color="primary") 查看更多
</template>

<style lang="scss" scoped>
.q-item__section--main {
  flex: none;
}
</style>
