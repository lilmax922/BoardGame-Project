<script setup>
defineProps({
  _id: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  currentPeople: {
    type: Number,
    default: 1
  },
  totalPeople: {
    type: Number
  },
  cardImage: {
    type: String,
    default: ''
  },
  types: {
    type: Array,
    default () {
      return []
    }
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<!-- <template lang="pug">
q-card.bg-card(flat)
  q-img.teamup-img(src="../assets/images/teamup-type/mindset.jpg" ratio=16/9)
  q-card-section.q-gutter-sm
    .type-tag #策略 #陣營 #心機
    .text-h4 3/3 揪揪揪...
  q-separator(inset)
  q-card-section.flex-center(horizontal)
    q-card-section.col-8.q-pt-none
      q-list
        q-item.q-pa-none
          q-item-section
            q-icon(name="mdi-calendar-clock" size="xs")
          q-item-section &nbsp;2023/3/03 14:30
        q-item.q-pa-none
          q-item-section.flex-auto
            q-icon(name="mdi-account-multiple" size="xs")
          q-item-section &nbsp;4 / 7 人 (尚可參加)
    q-card-section.col-4.q-pa-none
      q-btn.more-btn(color="primary") 參加揪團
</template> -->

<template>
  <div id="teamup_card">
    <q-card flat>
      <div class="image_area">
        <q-img :src="cardImage" />
      </div>
      <q-card-section>
        <div class="interesting_area q-mb-sm">
          <q-chip class="interesting_tag" v-for="(type, i) in interesting" :key="i" color="secondary" text-color="white" size="sm">
            &#35;{{ type }}
          </q-chip>
        </div>
        <div class="text-h5 bg_name">{{ name }}</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="flex-center" horizontal>
        <q-card-section class="col-8 q-pt-none">
          <q-list>
            <q-item class="q-pa-none">
              <q-item-section>
                <q-icon name="mdi-account-multiple" size="xs" />
              </q-item-section>
              <q-item-section style="font-size: 18px">
                &nbsp;{{ players }} 人
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none">
              <q-item-section class="flex-auto">
                <q-icon name="mdi-clock" size="xs" />
              </q-item-section>
              <q-item-section> &nbsp;約 {{ gameTime }} 分鐘 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="col-4 q-pa-none flex justify-center">
          <q-btn class="more_btn" color="primary" :to="'/BGInfo/' + _id" label="查看更多"></q-btn>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.q-item__section--main {
  flex: none;
  margin-left: 0;
}
</style>
