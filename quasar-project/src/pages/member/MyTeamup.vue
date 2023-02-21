<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useTeamupStore } from 'src/stores/teamup'

const teamupStore = useTeamupStore()
const { submitTeamup, getMyTeamup } = teamupStore
const { teamups } = storeToRefs(teamupStore)

getMyTeamup()

const teamupForm = reactive({
  _id: '',
  organizer: '',
  participant: [],
  date: Date,
  time: '',
  hour: 0,
  currentPeople: 0,
  totalPeople: 0,
  cardImage: undefined,
  loading: false,
  dialog: false
})

// q-table
const columns = [
  {
    name: 'organizer',
    label: '發起人',
    field: row => row.organizer,
    align: 'left'
  },
  {
    name: 'date',
    label: '日期',
    field: (row) => row.date.substring(0, 10),
    align: 'left',
    sortable: true
  },
  {
    name: 'time',
    label: '時間',
    field: (row) => row.time,
    align: 'left',
    sortable: true
  },
  {
    name: 'hour',
    label: '時數',
    field: (row) => row.hour,
    align: 'left',
    sortable: true
  },
  {
    name: 'totalPeople',
    label: '人數',
    field: (row) => row.totalPeople,
    align: 'left',
    sortable: true
  },
  {
    name: 'edit',
    label: '編輯/刪除',
    field: (row) => row.edit,
    align: 'center'
  }
]

const openDialog = (index) => {
  const idx = teamupForm.value.findIndex(
    (teamup) => teamup._id === index
  )
  teamupForm._id = teamups.value[idx]._id
  teamupForm.date = teamups.value[idx].date
  teamupForm.time = teamups.value[idx].time
  teamupForm.hour = teamups.value[idx].hour
  teamupForm.totalPeople = teamups.value[idx].totalPeople
  teamupForm.dialog = true
}

const onSubmit = async () => {
  teamupForm.loading = true
  await submitTeamup({
    _id: teamupForm._id,
    totalPeople: teamupForm.totalPeople
  })
  teamupForm.loading = false
  teamupForm.dialog = false
}
</script>

<template>
  <q-page id="my_teamup" padding>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h4>我的揪團</h4>
        </div>
        <div class="col-12">
          <q-table
            title="Teamups"
            :rows="teamups"
            :columns="columns"
            row-key="_id"
            :rows-per-page-options="[10, 15, 0]"
            :filter="filter"
          >
            <!-- filter_area -->
            <template v-slot:top-right>
              <q-input debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="mdi-search" />
                </template>
              </q-input>
            </template>

            <!-- edit_area -->
            <template v-slot:body-cell-edit="props">
              <q-td class="text-center q-gutter-sm">
                <q-btn
                  icon="mdi-pencil"
                  color="info"
                  fab-mini
                  unelevated
                  size="sm"
                  @click="openDialog(props.row._id)"
                />
                <q-btn
                  icon="delete"
                  color="secondary"
                  fab-mini
                  unelevated
                  @click="deleteReservation(props.row._id)"
                />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>

      <!-- 編輯預約資料 dialog -->
      <q-dialog v-model="teamupForm.dialog" persistent>
        <q-layout class="edit_dialog" container>
          <q-card>
            <q-form @submit="onSubmit">
              <q-card-section class="flex justify-end">
                <q-btn push dense icon="mdi-close" v-close-popup />
              </q-card-section>
              <div class="text-h4 text-center">編輯預約資料</div>
              <q-card-section>
                <div class="text-subtitle1">預約人數</div>
                <q-slider
                  v-model="reservationForm.totalPeople"
                  markers
                  marker-labels
                  thumb-color="secondary"
                  :min="1"
                  :max="10"
                />
              </q-card-section>
              <q-card-actions class="flex justify-center q-pa-md">
                <q-btn
                  class="submit_btn text-center"
                  type="submit"
                  label="確認修改"
                  :loading="reservationForm.loading"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-layout>
      </q-dialog>
    </div>
  </q-page>
</template>

<style lang="scss">
.edit_dialog {
  position: absolute;
  top: 25%;
  .submit_btn {
    color: #fff;
    background-color: $primary;
    border-radius: 8px;
  }
}
.swal2-container {
  z-index: 10000;
}
</style>
