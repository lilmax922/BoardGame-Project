import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Notify } from 'quasar'
import Swal from 'sweetalert2'
import { api, apiAuth } from 'boot/axios.js'

export const useUserStore = defineStore('user', () => {
  const email = ref('')
  const phone = ref('')
  const nickname = ref('')
  const token = ref('')
  const role = ref(0)
  const showLoginCard = ref(false)

  const isLogin = computed(() => {
    return token.value.length > 0
  })
  const isAdmin = computed(() => {
    return role.value === 1
  })
  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/256/${email.value}?colors=C4DDD6,D4DDD6,E4DDD6,E4E3CD,ECECDD`
  })

  async function login (form) {
    try {
      const { data } = await api.post('/users/login', form)
      email.value = data.result.email
      phone.value = data.result.phone
      nickname.value = data.result.nickname
      token.value = data.result.token
      role.value = data.result.role
      Notify.create({
        message: '登入成功',
        textColor: 'primary',
        icon: 'mdi-emoticon-happy-outline',
        color: 'white',
        position: 'top'
      })
    } catch (error) {
      Notify.create({
        message: '登入失敗',
        textColor: 'secondary',
        color: 'white',
        icon: 'mdi-emoticon-dead-outline',
        caption: error?.response?.data?.message || '發生錯誤',
        position: 'top'
      })
    }
  }

  async function logout () {
    try {
      await apiAuth.delete('/users/logout')
      token.value = ''
      email.value = ''
      role.value = 0
      this.router.push('/')
      Notify.create({
        message: '登出成功',
        textColor: 'primary',
        icon: 'mdi-emoticon-happy-outline',
        color: 'white',
        position: 'top'
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: '失敗',
        text: error?.response?.data?.message || '發生錯誤'
      })
    }
  }

  async function getMyself () {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/myself')
      email.value = data.result.email
      nickname.value = data.result.nickname
      phone.value = data.result.phone
      role.value = data.result.role
    } catch (error) {
      logout()
    }
  }

  async function editMyself (form) {
    try {
      const { data } = await apiAuth.patch('/users/editmyself')
      avatar.value = data.result.avatar
      phone.value = data.result.phone
      nickname.value = data.result.nickname
      // password.value = data.result.password
    } catch (error) {
      Notify.create({
        message: '編輯失敗',
        textColor: 'secondary',
        color: 'white',
        icon: 'mdi-emoticon-dead-outline',
        caption: error?.response?.data?.message || '發生錯誤',
        position: 'top'
      })
    }
  }

  // const getMyReservations = async (req, res) => {
  //   try {
  //     const { data } = apiAuth.get('/reservations/getMyReservations')
  //   } catch (error) {
  //     Notify.create({
  //       message: '取得失敗',
  //       caption: error?.response?.data?.message || '發生錯誤',
  //       color: '$accent'
  //     })
  //   }
  // }

  return {
    token,
    email,
    phone,
    nickname,
    role,
    avatar,
    login,
    logout,
    getMyself,
    editMyself,
    isLogin,
    isAdmin,
    showLoginCard
  }
}, {
  persist: {
    key: 'user',
    paths: ['token']
  }
})
