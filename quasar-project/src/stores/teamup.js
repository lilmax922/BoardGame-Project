import { defineStore } from 'pinia'
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from 'src/boot/axios'

export const useTeamupStore = defineStore('teamup', () => {
  const teamups = reactive([])

  // 發起揪團
  async function submitTeamup (form, _id) {
    try {
      if (form.get('_id') === '') {
        const { data } = await apiAuth.post('/teamups', form)
        teamups.push(data.result)
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '揪團成功~'
        })
      } else {
        const { data } = await apiAuth.patch('/teamups/' + _id, form)
        const index = teamups.findIndex(teamup => teamup._id === _id)
        teamups[index] = data.result
        await Swal.fire({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
      }
      // this.router.push('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  // 取所有揪團
  const getAllTeamups = async () => {
    try {
      const { data } = await apiAuth.get('/teamups/all')
      teamups.splice(0, teamups.length, ...data.result)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  const joinTeamup = async (form) => {
    console.log(form)
    console.log(form._id)
    try {
      const { data } = await apiAuth.post('/teamups/' + form._id)
      console.log(data.result)
      teamups.push(...data.result)
      await Swal.fire({
        icon: 'success',
        title: '成功',
        text: '參加成功~'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  return {
    teamups,
    submitTeamup,
    joinTeamup,
    getAllTeamups
  }
})
