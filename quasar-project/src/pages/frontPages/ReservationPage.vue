<script setup>
import { reactive, watch, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReservationStore } from 'stores/reservation.js'
import { apiAuth } from 'src/boot/axios'

const reservationStore = useReservationStore()
const { submitReservation } = reservationStore
const { reservations } = storeToRefs(reservationStore)

const mask = 'YYYY-MM-DD'
const availableTime = ref([])
const reservationForm = reactive({
  hours: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  minutes: [0, 15, 30, 45],
  selectedDate: '',
  selectedTime: '',
  selectedHour: 1,
  selectedPeople: 1,
  reserver: '',
  _id: reservations._id || '',
  loading: false
})

const availableTimeBtn = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']

watch(() => reservationForm.selectedDate, async (val) => {
  try {
    const { data } = await apiAuth.post('/reservations/getdate', { selectedDate: val })
    availableTime.value = []

    const TimeAndHours = []
    data.result.forEach(time => {
      TimeAndHours.push({
        time: time.selectedTime,
        hours: time.hours
      })
    })

    console.log(TimeAndHours)
    TimeAndHours.forEach((item) => {
      const index = availableTimeBtn.findIndex((btn) =>
        btn === item.time
      )
      console.log(item.hours, 'hours')
      for (let i = index; i <= index + item.hours; i++) {
        availableTime.value.push(availableTimeBtn[i])
        if (availableTimeBtn[i] === availableTimeBtn[availableTimeBtn.length - 1]) {
          return
        }
      }
    })
    console.log(availableTime.value)
  } catch (error) {
    console.log(error)
  }
})

const isDisableBtn = (time) => {
  return availableTime.value.includes(time)
}

const onSubmit = async () => {
  reservationForm.loading = true

  await submitReservation({
    _id: reservationForm._id,
    selectedDate: reservationForm.selectedDate,
    selectedTime: reservationForm.selectedTime,
    period: reservationForm.selectedPeriod,
    totalPeople: reservationForm.selectedPeople
  })
  reservationForm.loading = false
}
</script>

<template lang="pug">
q-page#reservation(padding)
  div.q-ma-lg
    q-breadcrumbs
      q-breadcrumbs-el(icon='home' to='/')
      q-breadcrumbs-el(label='手刀預約' icon='mdi-calendar')
  .container.q-gutter-md
    section.q-mt-lg
      .text-h3 預約須知
      div Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, vitae, eum eveniet aliquid illum explicabo vero doloremque reiciendis eius minus tempore incidunt odit commodi nostrum quam necessitatibus provident molestias. Iure!
    section.flex.justify-center
      q-card(style="width:1000px")
        q-form.q-gutter-md.flex.flex-center.column(@submit="onSubmit")
          // > 日期/時間
          q-card-section.flex.justify-around(horizontal)
            q-card-section(style="width:600px").col-8.q-gutter-md
              .text-h6 預約時間
              q-date(
                v-model="reservationForm.selectedDate"
                subtitle="請選擇預約日期"
                :mask="mask"
                today-btn
                navigation-min-year-month="2023/02"
                navigation-max-year-month="2023/12"
              )
              div(v-if="reservationForm.selectedDate !== ''")
                q-btn(
                  color="secondary"
                  @click="reservationForm.selectedTime = timeBtn"
                  v-for="timeBtn in availableTimeBtn"
                  :disable="isDisableBtn(timeBtn)"
                  :key="timeBtn"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                )
                  | {{ timeBtn }}
              // > 選擇時數
              .text-h6 預約時數
              q-slider(v-model="reservationForm.selectedPeriod" markers marker-labels thumb-color="secondary" label-always :min="1" :max="10")
              .text-h6 預約人數
              q-slider(v-model="reservationForm.selectedPeople" markers marker-labels thumb-color="secondary" label-always :min="1" :max="12")
            q-card-section(style="width:400px").col-4.q-gutter-md.flex.flex-center.column
              .text-h4.text-center.q-pb-xl 預約確認
              .flex.items-start.column
                p.text-h6 時間: {{ reservationForm.selectedDate }} {{ reservationForm.selectedTime }}
                p.text-h6 時數: {{ reservationForm.selectedPeriod }} 小時
                p.text-h6 人數: {{ reservationForm.selectedPeople }} 人
                q-card-section
                  q-btn(label="送出" type="submit" color="primary" :disable="reservationForm.loading" size="lg")
</template>

<!-- <template>
  <q-card>
    <q-form>
      <q-date type="date" v-model="selectedDate" />
      <q-input filled v-model="selectedTime" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="selectedTime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn
        type="submit"
        v-for="timeSlot in availableTimeSlots"
        :key="timeSlot"
        @click="bookAppointment(timeSlot)"
      >
        {{ timeSlot }}
      </q-btn>
    </q-form>
  </q-card>
</template> -->

<script>

export default {
  setup () {
    const selectedDate = ref(null)
    const selectedTime = ref(null)

    const availableTimeSlots = computed(() => {
      // 這裡應該是呼叫後端 API，取得可用的預約時段，
      // 並以 selectedDate 和 selectedTime 為參數。
      // 為了簡潔，我們在這裡直接回傳一個固定的陣列。
      return ['9:00', '10:00', '11:00', '12:00', '13:00']
    })

    function bookAppointment (timeSlot) {
      // 這裡是處理預約的邏輯，可能包含呼叫後端 API
      console.log(`Appointment booked at ${selectedDate.value} ${timeSlot}`)
    }

    return { selectedDate, selectedTime, availableTimeSlots, bookAppointment }
  }
}
</script>
