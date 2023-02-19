<script setup>
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import _ from 'lodash'
import { useTeamupStore } from 'src/stores/teamup'
import TeamupCard from 'src/components/TeamupCard.vue'

const teamupStore = useTeamupStore()
const { getAllTeamups } = teamupStore
const { teamups } = storeToRefs(teamupStore)

const chips = ref([])
const types = ['陣營', '策略', '心機', '抽象', '卡牌', '派對', '家庭', '兒童']

const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
const filterCondition = reactive({
  types: ['陣營', '策略', '心機', '抽象', '卡牌', '派對', '家庭', '兒童'],
  date: currentDate
})

const addChip = () => {
  chips.value = filterCondition.types.map((type) => type)
}
const delChip = (i) => {
  filterCondition.types.splice(i, 1)
  chips.value.splice(i, 1)
}

const filterFunc = computed(() => {
  return teamups.value.filter((teamup) => {
    return parseInt(_.intersection(teamup.types, filterCondition.types).length) !== 0
  })
})

getAllTeamups()
</script>

<template>
  <q-page id="searchTeamups" padding>
    <!-- 麵包屑 -->
    <div class="breadcrumb q-ma-lg">
      <q-breadcrumbs>
        <template #separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <q-breadcrumbs-el label="揪團組隊" />
      </q-breadcrumbs>
    </div>

    <div class="container">
      <section class="header flex items-center">
        <div class="header-text text-h3 q-pr-lg">揪團組隊</div>
        <q-btn class="teamup_btn" label="我要揪團" to="/teamup" />
      </section>
      <section class="teamupList">
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
                <div class="text-h6 q-pa-md">喜歡的桌遊類型</div>
              </div>
              <div class="row flex flex-center">
                <div class="col-5">
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

            <!-- <div class="game_time">
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
            </div> -->

          </div>
        </div>

        <div class="cards_container">
          <div class="row q-mx-auto">
            <div
              class="col-12 col-md-6 col-lg-4 col-xl-3 flex flex-center q-mb-lg"
              v-for="(teamup, i) in filterFunc"
              :key="i"
            >
              <TeamupCard class="teamup_card q-mb-lg" v-bind="teamup" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<style lang="scss">
#searchTeamups {
  width: 100%;

  .header {
    padding-bottom: 55px;
    .header-text {
      border-left: 15px solid $accent;
      padding-left: 1rem;
      color: $accent;
    }
  }
  .teamup_btn {
    border-radius: 8px;
    background-color: $primary;

     &:hover {
      transition: 0.5s;
      color: $primary;
      background-color: #fff;
     }
  }

  .teamupList {
    width: 100%;

    .cards_container {
      padding-top: 55px;

      .teamup_card {
        width: 300px;
        height: 500px;
      }
    }

    .search_container {
      border: 1px solid #fff;
      border-radius: 16px;
      padding: 1rem;
    }
  }
}
</style>
