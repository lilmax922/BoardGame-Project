<script setup>
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { getPostBoardgames } = boardgameStore
getPostBoardgames()
const { boardgames } = storeToRefs(boardgameStore)

const typeGroup = ref(['不限'])
const types = reactive([
  { label: '不限', value: '不限' },
  { label: '陣營', value: '陣營' },
  { label: '策略', value: '策略' },
  { label: '抽象', value: '抽象' },
  { label: '心機', value: '心機' },
  { label: '卡牌', value: '卡牌' },
  { label: '派對', value: '派對' },
  { label: '家庭', value: '家庭' },
  { label: '兒童', value: '兒童' }
])

// const types = reactive({
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

const selection = computed(() => {
  return Object.keys(types)
    .filter((type) => types[type] === true)
    .join(', ')
})

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
  <q-page id="explore" padding>
    <!-- 麵包屑 -->
    <div class="breadcrumb q-ma-lg">
      <q-breadcrumbs>
        <template #separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>
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
      <section class="boardgameList">
        <!-- <q-expansion-item
          v-model="expanded"
          icon="mdi-filter-variant"
          label="篩選條件"
        > -->
          <div class="search_container">
            <div class="search-bar">
              <q-input name="search" rounded placeholder="關鍵字/標籤搜尋">
                <template v-slot:append>
                  <q-btn icon="search" flat rounded />
                </template>
              </q-input>
            </div>
            <div class="filter-area q-gutter-md">
              <div class="game-types">
                <div class="flex items-center">
                  <q-icon
                    class="q-pl-md"
                    name="mdi-google-downasaur"
                    size="sm"
                  />
                  <span class="text-h6 q-pa-md">桌遊類型</span>
                </div>
                <div class="flex flex-center">
                  <q-option-group
                    v-model="typeGroup"
                    :options="types"
                    type="checkbox"
                    inline
                    size="lg"
                  />
                </div>
              </div>
              <div class="game_time">
                <div class="flex items-center">
                  <q-icon class="q-pl-md" name="mdi-timer-sand" size="sm" />
                  <div class="text-h6 q-pa-md">遊戲時間</div>
                  <q-slider
                    v-model="form.gameTime"
                    class="q-px-lg"
                    :min="1"
                    :max="60"
                    markers
                    marker-labels
                    thumb-color="secondary"
                    :step="10"
                  />
                </div>
              </div>
              <div class="players">
                <div class="flex items-center">
                  <q-icon class="q-pl-md" name="mdi-account-group" size="sm" />
                  <div class="text-h6 q-pa-md">遊玩人數</div>
                  <q-slider
                    v-model="form.players"
                    class="q-px-lg"
                    :min="1"
                    :max="12"
                    markers
                    marker-labels
                    thumb-color="secondary"
                  />
                </div>
              </div>
            </div>
          </div>
        <!-- </q-expansion-item> -->
        <div class="cards_container">
          <div class="row flex">
            <div
              class="col-12 col-md-6 col-lg-4 col-xl-3 flex flex-center q-mb-lg"
              v-for="boardgame in boardgames"
              :key="boardgame._id"
            >
              <BoardgameCard class="bg_card q-mb-lg" v-bind="boardgame" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#explore {
  width: 100%;

  .header {
    padding-bottom: 55px;
  }

  .boardgameList {
    width: 100%;

    .cards_container {
      padding-top: 55px;

      .bg_card {
        width: 300px;
      }
    }

    .search_container {
      border: 1px solid #fff;
      border-radius: 16px;
      padding: 1rem;

      .game_time {
        border-radius: 16px;
      }
    }
  }
}
</style>
