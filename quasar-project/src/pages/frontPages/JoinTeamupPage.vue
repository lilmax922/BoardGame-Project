<script setup>
import { reactive, onMounted } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useTeamupStore } from 'src/stores/teamup'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const teamupStore = useTeamupStore()
const { joinTeamup } = useTeamupStore()
const { teamups } = storeToRefs(teamupStore)

const teamup = reactive({
  _id: teamups._id || '',
  organizer: '',
  participant: '',
  date: '',
  time: '',
  hour: 1,
  currentPeople: 1,
  totalPeople: 1,
  cardImage: undefined,
  types: [],
  title: '',
  content: '',
  loading: false
});

// 取揪團資料
(async () => {
  try {
    const { data } = await api.get('/teamups/' + route.params.id)
    teamup._id = data.result._id
    teamup.organizer = data.result.organizer
    teamup.participant = data.result.participant
    teamup.date = data.result.date
    teamup.time = data.result.time
    teamup.hour = data.result.hour
    teamup.currentPeople = data.result.currentPeople
    teamup.totalPeople = data.result.totalPeople
    teamup.cardImage = data.result.cardImage
    teamup.types = data.result.types
    teamup.title = data.result.title
    teamup.content = data.result.content

    // 使用者可以看到 title 變更，但對爬蟲沒用
    document.title = '差滴滴 | ' + teamup.name
  } catch (error) {
    $q.notify({
      position: 'top',
      message: error?.response?.data?.message || '發生錯誤',
      color: 'negative'
    })
    router.go(-1)
  }
})()

const onSubmit = async () => {
  teamup.loading = true
  await joinTeamup({
    participant: teamup.participant
  })
  teamup.loading = false
}
</script>

<template>
  <q-page id="jointeamup" padding>
    <div class="breadcrumb q-ma-lg">
      <q-breadcrumbs>
        <template #separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>
        <q-breadcrumbs-el icon="mdi-home" to="/" />
        <q-breadcrumbs-el label="揪團組隊" to="/searchTeamups" />
        <q-breadcrumbs-el label="參加揪團" />
      </q-breadcrumbs>
    </div>

    <div class="container">
      <q-form @submit="onSubmit" class="teamup_wrap">
        <q-card class="teamup_card" flat>
          <q-card-section class="q-pa-xl" horizontal>
            <q-img class="col-5" :src="teamup.cardImage" />

            <q-card-section class="info_area col-7 flex column">
              <div class="nickname_area">
                <div class="text-overline">揪團發起人暱稱</div>
              </div>

              <div class="title_area q-mt-md">
                <div class="text-h2">{{ teamup.title }}</div>
              </div>

              <q-separator class="q-my-lg" />

              <div class="content_area">
                <div class="text-h4">{{ teamup.content }}</div>
              </div>

              <div class="icon_area q-mt-lg">
                <div class="type">
                  <q-icon name="mdi-google-downasaur" class="q-pr-sm" />
                  <q-chip
                    v-for="type in teamup.types"
                    :key="type"
                    color="secondary"
                    size="md"
                  >
                    &#35;{{ type }}
                  </q-chip>
                </div>
                <div class="date flex items-center">
                  <q-icon name="mdi-calendar-clock" />
                  <div>&nbsp; {{ teamup.date.substring(0, 10) }}</div>
                </div>
                <div class="time flex items-center">
                  <q-icon name="mdi-clock-time-four-outline"></q-icon>
                  <div>&nbsp; {{ teamup.time }}</div>
                </div>
                <div class="people flex items-center">
                  <q-icon name="mdi-account-group"></q-icon>
                  <div>
                    &nbsp; {{ teamup.currentPeople }} /
                    {{ teamup.totalPeople }} 人
                  </div>
                </div>
                <q-btn class="joinBtn" type="submit" label="參加揪團" :disable="teamup.loading" />
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
#jointeamup {
  width: 100%;

  .teamup_card {
    // max-width: 1200px;
    // background-color: #eee;

    & {
      font-size: 24px;
    }
    .info_area {
      padding-left: 2rem;

      .joinBtn {
        position: absolute;
        top: 85%;
        right: 0;
        width: 200px;
        border-radius: 16px;
        font-size: 20px;
        background-color: $primary;
      }

      .type,.date,.time {
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>
