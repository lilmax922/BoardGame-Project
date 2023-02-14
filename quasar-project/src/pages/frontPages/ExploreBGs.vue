<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { getPostBoardgames } = boardgameStore
getPostBoardgames()
const { boardgames } = storeToRefs(boardgameStore)

const filterTypes = ref([
  '陣營',
  '策略',
  '抽象',
  '心機',
  '卡牌',
  '派對',
  '家庭',
  '兒童'
])
// const filterTypes = reactive({
//   camp: {
//     type: false,
//     label: '陣營'
//   },
//   strategy: {
//     type: false,
//     label: '策略'
//   },
//   abstract: {
//     type: false,
//     label: '抽象'
//   },
//   crafty: {
//     type: false,
//     label: '心機'
//   },
//   card: {
//     type: false,
//     label: '卡牌'
//   },
//   party: {
//     type: false,
//     label: '派對'
//   },
//   family: {
//     type: false,
//     label: '家庭'
//   },
//   children: {
//     type: false,
//     label: '兒童'
//   }
// })

const form = reactive({
  players: {
    min: 1,
    max: 15
  },
  gameTime: {
    min: 1,
    max: 60
  }
})
</script>

<template>
  <q-page id="explore-boardgames" padding>
    <div class="q-ma-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <q-breadcrumbs-el label="探索桌遊" />
      </q-breadcrumbs>
    </div>
    <div class="container">
      <section class="header flex items-center">
        <div class="text-h3 q-pr-lg" style="display: inline-block">
          探索桌遊
        </div>
        <q-btn label="我要預約" to="/reservation" color="primary" />
      </section>
      <section class="page-body">
        <div id="search-container">
          <div id="search-bar">
            <q-input name="search" placeholder="請輸入關鍵字" borderless>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div id="filter-area" class="q-gutter-md">
            <div id="game-types">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-google-downasaur" size="sm" />
                <span class="text-h6 q-pa-md">桌遊類型</span>
              </div>
              <div class="flex flex-center q-gutter-md">
                <q-checkbox
                  v-for="(type, idx) in filterTypes"
                  :key="idx"
                  v-model="filterTypes"
                  :label="type"
                  :val="type"
                />
                <!-- <p>{{ filterTypes }}</p> -->
                <!-- <q-checkbox v-model="filterTypes.camp.type" :label="filterTypes.camp.label" :val="filterTypes.camp.label" />
                <q-checkbox v-model="filterTypes.strategy.type" :label="filterTypes.strategy.label" :val="filterTypes.strategy.label" />
                <q-checkbox v-model="filterTypes.abstract.type" :label="filterTypes.abstract.label" :val="filterTypes.abstract.label" />
                <q-checkbox v-model="filterTypes.crafty.type" :label="filterTypes.crafty.label" :val="filterTypes.crafty.label" />
                <q-checkbox v-model="filterTypes.card.type" :label="filterTypes.card.label" :val="filterTypes.card.label" />
                <q-checkbox v-model="filterTypes.party.type" :label="filterTypes.party.label" :val="filterTypes.party.label" />
                <q-checkbox v-model="filterTypes.family.type" :label="filterTypes.family.label" :val="filterTypes.family.label" />
                <q-checkbox v-model="filterTypes.children.type" :label="filterTypes.children.label" :val="filterTypes.children.label" /> -->
              </div>
            </div>
            <div id="game-time">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-timer-sand" size="sm" />
                <div class="text-h6 q-pa-md">遊戲時間</div>
                <q-range
                  v-model="form.gameTime"
                  class="q-px-lg"
                  :min="5"
                  :max="60"
                  markers
                  marker-labels
                  thumb-color="secondary"
                  :step="10"
                />
              </div>
            </div>
            <div id="players">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-account-group" size="sm" />
                <div class="text-h6 q-pa-md">遊玩人數</div>
                <q-range
                  v-model="form.players"
                  class="q-px-lg"
                  :min="1"
                  :max="15"
                  markers
                  marker-labels
                  thumb-color="secondary"
                  :step="2"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="cards-container">
          <div class="row flex justify-between">
            <div
              class="col-12 col-md-6 col-lg-3 flex flex-center q-mb-lg"
              v-for="boardgame in boardgames"
              :key="boardgame._id"
            >
              <BoardgameCard class="bg-card q-mb-lg" v-bind="boardgame" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#explore-boardgames {
  width: 100%;

  .header {
    padding-bottom: 55px;
  }

  .page-body {
    width: 100%;

    #cards-container {
      padding-top: 55px;

      .bg-card {
        width: 300px;
      }
    }

    #search-container {
      border: 1px solid #fff;
      border-radius: 16px;
      padding: 1rem;

      .game-time {
        border-radius: 16px;
      }

      #filter-area {
        border-radius: 16px;
      }
    }
  }
}
</style>
