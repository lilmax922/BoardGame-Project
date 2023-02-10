<script setup>
import { ref, reactive } from 'vue'
import { date } from 'quasar'
import { storeToRefs } from 'pinia'
import { useReservationStore } from 'stores/reservation.js'

const reservationStore = useReservationStore()
const { submitReservation } = reservationStore
const { reservations } = storeToRefs(reservationStore)

const mask = 'YYYY-MM-DD HH:mm'
// const selectedDate = ref('')
const reservationForm = reactive({
  hours: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  minutes: [0, 15, 30, 45],
  selectedDate: '',
  selectedPeriod: 1,
  selectedPeople: 1,
  reserver: '',
  reserverName: '',
  reserverPhone: '',
  loading: false
})

const onSubmit = async () => {
  reservationForm.loading = true

  const fd = new FormData()
  fd.append('reserver', reservationForm.reserver)
  fd.append('reserverName', reservationForm.reserverName)
  fd.append('reserverPhone', reservationForm.reserverPhone)
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
      q-card(style="width:800px")
        q-form.q-gutter-md.flex.flex-center.column(@submit="onSubmit")
          // > 日期/時間
          q-card-section.col-12.q-gutter-md
            .text-h6 預約時間
              //- span.text-subtitle2 (日期與時間)
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
            //- q-select(v-model="selectedPeriod"
            //- filled
            //- transition-show="scale"
            //- transition-hide="scale"
            //- color='primary'
            //- label="請選擇預約時數"
            //- :options="reserveOptions"
            //- )
            //-   template(v-slot:prepend)
            //-     q-icon(name="event")
            // > 選擇時數
            .text-h6 預約時數
            q-slider(v-model="reservationForm.selectedPeriod" markers marker-labels thumb-color="secondary" label-always :min="1" :max="10")
            .text-h6 預約人數
            q-slider(v-model="reservationForm.selectedPeople" markers marker-labels thumb-color="secondary" label-always :min="1" :max="12")
          q-card-section.col-12.q-gutter-md
            .text-h4.text-center 預約確認
            p.text-h6 時間: {{ reservationForm.selectedDate }}
            p.text-h6 時數: {{ reservationForm.selectedPeriod }} 小時
            p.text-h6 人數: {{ reservationForm.selectedPeople }} 人
          q-card-actions
            q-btn(label="送出" type="submit" color="primary" :disable="reservationForm.loading")
</template>

<style>
</style>
