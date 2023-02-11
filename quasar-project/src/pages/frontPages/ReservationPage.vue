<script setup>
import { ref, reactive } from 'vue'
import { date } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import { useReservationStore } from 'stores/reservation.js'

// const useReservationStore = useUserStore()
const reservationStore = useReservationStore()
const { submitReservation } = reservationStore
const { reservations } = storeToRefs(reservationStore)

const mask = 'YYYY-MM-DD HH:mm'
const reservationForm = reactive({
  hours: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  minutes: [0, 15, 30, 45],
  selectedDate: '',
  selectedPeriod: 1,
  selectedPeople: 1,
  reserver: '',
  loading: false
})

const onSubmit = async () => {
  reservationForm.loading = true

  const fd = new FormData()
  fd.append('startDate', reservationForm.selectedDate)
  fd.append('period', reservationForm.selectedPeriod)
  fd.append('totalPeople', reservationForm.selectedPeople)
  await submitReservation(fd, reservationForm._id)
  reservationForm.loading = false
}
</script>

<template lang="pug">
q-page#reservation(padding)
  .container.q-gutter-md
    section
      q-breadcrumbs
        q-breadcrumbs-el(icon='home' to='/')
        q-breadcrumbs-el(label='手刀預約' icon='mdi-calendar')
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
              q-input(filled v-model="reservationForm.selectedDate" label="日期與時間")
                template(v-slot:prepend)
                  q-icon.cursor-pointer(name="event")
                    q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                      q-date(
                        v-model="reservationForm.selectedDate"
                        :mask="mask"
                        today-btn
                        subtitle="請選擇預約日期"
                        navigation-min-year-month="2023/02"
                        navigation-max-year-month="2023/12"
                      )
                        .row.items-center.justify-end
                          q-btn(v-close-popup label="Close" color="primary" flat)
                template(v-slot:append)
                  q-icon.cursor-pointer(name="access_time")
                    q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                      q-time(
                        v-model="reservationForm.selectedDate"
                        :hour-options="reservationForm.hours" :minute-options="reservationForm.minutes"
                        :mask="mask"
                      )
                        .row.items-center.justify-end
                          q-btn(v-close-popup label="Close" color="primary" flat)
              // > 選擇時數
              .text-h6 預約時數
              q-slider(v-model="reservationForm.selectedPeriod" markers marker-labels thumb-color="secondary" label-always :min="1" :max="10")
              .text-h6 預約人數
              q-slider(v-model="reservationForm.selectedPeople" markers marker-labels thumb-color="secondary" label-always :min="1" :max="12")
            q-card-section(style="width:400px").col-4.q-gutter-md.flex.flex-center.column
              .text-h4.text-center.q-pb-xl 預約確認
              .flex.flex-center.column
                p.text-h6 時間: {{ reservationForm.selectedDate }}
                p.text-h6 時數: {{ reservationForm.selectedPeriod }} 小時
                p.text-h6 人數: {{ reservationForm.selectedPeople }} 人
                q-btn(label="送出" type="submit" color="primary" :disable="reservationForm.loading")
</template>

<style>
</style>
