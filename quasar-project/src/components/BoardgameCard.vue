<script setup>
defineProps({
  _id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  cardImage: {
    type: String
  },
  types: {
    type: Array
  },
  players: {
    type: String,
    default: ''
  },
  gameTime: {
    type: Number
  },
  post: {
    type: Boolean,
    default: false
  }
})
</script>

<template lang="pug">
q-card.bg-card(flat)
  q-img(:src="cardImage" ratio=4/3)
  q-card-section
    span.type-tag(v-for="(type,idx) in types" :key="idx") &#35;{{ type }}&nbsp;
    .text-h4 {{ name }}
  q-separator(inset)
  q-card-section.flex-center(horizontal)
    q-card-section.col-8.q-pt-none
      q-list
        q-item.q-pa-none
          q-item-section
            q-icon(name="mdi-account-multiple" size="xs")
          q-item-section(style="fontSize:18px") &nbsp;{{ players }} 人
        q-item.q-pa-none
          q-item-section.flex-auto
            q-icon(name="mdi-clock" size="xs")
          q-item-section &nbsp;約 {{ gameTime }} 分鐘
    q-card-section.col-4.q-pa-none.flex.justify-center
      q-btn.moreBtn(color="primary" to="/BGInfo/:id") 查看更多
</template>

<style lang="scss">
.bg-card {
  & {
    font-size: 16px;
  }
  .q-item__section--main {
    flex: none;
    margin-left: 0;
  }
  .type-tag {
    font-size: 14px;
    color: #ccc;
  }
  .moreBtn {
    padding: 4px 6px;
    border-radius: 16px;
    &{
      font-size: 12px;
    }
  }
}
</style>
