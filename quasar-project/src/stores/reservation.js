import { defineStore } from 'pinia'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from 'src/boot/axios'

export const useReservationStore = defineStore('reservation', () => {
  const reservations = reactive([])

  const submitReservation = async (fd, _id) => {
    try {
      if (_id === '') {
        const { data } = await apiAuth.post('/reservations', fd)
        reservations.push(data.result)
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '預約成功'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  return {
    reservations,
    submitReservation
  }
})
