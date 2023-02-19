<script setup>
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import _ from 'lodash'
import { useBoardgameStore } from 'src/stores/boardgame'
import BoardgameCard from 'src/components/BoardgameCard.vue'

const boardgameStore = useBoardgameStore()
const { getPostBoardgames } = boardgameStore
getPostBoardgames()
const { boardgames } = storeToRefs(boardgameStore)

// const typeGroup = ref(['不限'])
// const types = reactive([
//   { label: '不限', value: '不限' },
//   { label: '陣營', value: '陣營' },
//   { label: '策略', value: '策略' },
//   { label: '抽象', value: '抽象' },
//   { label: '心機', value: '心機' },
//   { label: '卡牌', value: '卡牌' },
//   { label: '派對', value: '派對' },
//   { label: '家庭', value: '家庭' },
//   { label: '兒童', value: '兒童' }
// ])

const chips = ref([])
const types = ['陣營', '策略', '心機', '抽象', '卡牌', '派對', '家庭', '兒童']

const filterCondition = reactive({
  types: ['陣營', '策略', '心機', '抽象', '卡牌', '派對', '家庭', '兒童'],
  gameTime: 0,
  players: {
    min: 1,
    max: 12
  }
})

const addChip = () => {
  chips.value = filterCondition.types.map((type) => type)
}
const delChip = (i) => {
  filterCondition.types.splice(i, 1)
  chips.value.splice(i, 1)
}

const filterFunc = computed(() => {
  return boardgames.value.filter((boardgame) => {
    // console.log(boardgame.players)
    return (
      boardgame.gameTime >= filterCondition.gameTime &&
      boardgame.players.split('~').map(Number)[0] >= filterCondition.players.min &&
      boardgame.players.split('~').map(Number)[1] <= filterCondition.players.max &&
      parseInt(_.intersection(boardgame.types, filterCondition.types).length) !== 0
    )
  })
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
        <div class="header-text text-h3 q-pr-lg">探索桌遊</div>
        <q-btn class="reservation_btn" label="我要預約" to="/reservation" />
      </section>
      <section class="boardgameList">
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
                <q-icon class="q-pl-md" name="mdi-google-downasaur" size="sm" />
                <div class="text-h6 q-pa-md">桌遊類型</div>
              </div>
              <div class="row flex flex-center">
                <div class="col-5">
                  <!-- <q-option-group
                      v-model="typeGroup"
                      :options="types"
                      type="checkbox"
                      inline
                      size="lg"
                    /> -->
                  <q-select
                    v-model="filterCondition.types"
                    filled
                    multiple
                    :options="types"
                    label="新增標籤"
                    style="width: 250px"
                    bottom-slots
                  >
                    <template #append>
                      <q-btn round dense flat icon="add" @click="addChip" />
                    </template>
                  </q-select>
                </div>
                <div class="col-4">
                  <q-chip
                    v-for="(chip, i) in chips"
                    :key="i"
                    v-model="chips"
                    color="primary"
                    text-color="white"
                    clickable
                    icon="mdi-close-circle"
                    icon-color="white"
                    @click="delChip(i)"
                  >
                    {{ chip }}
                  </q-chip>
                </div>
              </div>
            </div>
            <div class="game_time">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-timer-sand" size="sm" />
                <div class="text-h6 q-pa-md">遊戲時間</div>
                <q-slider
                  v-model="filterCondition.gameTime"
                  class="q-px-lg"
                  :min="0"
                  :max="60"
                  markers
                  marker-labels
                  thumb-color="secondary"
                  :step="10"
                  snap
                />
              </div>
            </div>
            <div class="players">
              <div class="flex items-center">
                <q-icon class="q-pl-md" name="mdi-account-group" size="sm" />
                <div class="text-h6 q-pa-md">遊玩人數</div>
                <!-- <q-slider
                  v-model="filterCondition.players"
                  class="q-px-lg"
                  :min="1"
                  :max="12"
                  markers
                  marker-labels
                  thumb-color="secondary"
                  snap
                /> -->
                <q-range
                  v-model="filterCondition.players"
                  :min="1"
                  :max="12"
                  markers
                  marker-labels
                  thumb-color="secondary"
                  snap
                />
              </div>
            </div>
          </div>
        </div>

        <div class="cards_container">
          <div class="row q-mx-auto">
            <div
              class="col-12 col-md-6 col-lg-4 col-xl-3 flex flex-center q-mb-lg"
              v-for="(boardgame, i) in filterFunc"
              :key="i"
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
    .header-text {
      border-left: 15px solid $accent;
      padding-left: 1rem;
      color: $accent;
    }
  }

  .reservation_btn {
    border-radius: 8px;
    background-color: $primary;

     &:hover {
      transition: 0.5s;
      color: $primary;
      background-color: #fff;
     }
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
