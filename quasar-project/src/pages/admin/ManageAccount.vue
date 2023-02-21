<script setup>
import { reactive } from 'vue'
import validator from 'validator'
import { Notify } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/user'
import { api, apiAuth } from 'src/boot/axios'

// const user = useUserStore()
// const users = storeToRefs(user)

const accounts = reactive([])
const accountForm = reactive({
  _id: '',
  email: '',
  phone: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  isPwd: true,
  dialog: false,
  loading: false,
  index: -1
})

const rules = {
  email (email) {
    return validator.isEmail(email) || '信箱格式錯誤'
  },
  phone (phone) {
    return validator.isMobilePhone(phone, 'zh-TW') || '手機號碼格式錯誤'
  },
  required (value) {
    return (value && value.length > 0) || '欄位必填'
  },
  length (value) {
    return (
      (value.length >= 4 && value.length <= 12) || '長度必須為 4 ~ 12 個字'
    )
  },
  nickname (value) {
    return (
      (value.length >= 1 && value.length <= 12) || '長度必須為 1 ~ 12 個字'
    )
  },
  confirmPassword (value) {
    return value === accountForm.password || '密碼不一致'
  }
}

const getAllUsers = async () => {
  try {
    const { data } = await apiAuth.get('/users/allusers')
    console.log(data.result)
    accounts.push(...data.result)
  } catch (error) {
    Notify.create({
      message: '資料取得失敗',
      textColor: 'secondary',
      color: 'white',
      icon: 'mdi-emoticon-dead-outline',
      caption: error?.response?.data?.message || '發生錯誤'
    })
  }
}
getAllUsers()

const openDialog = (index) => {
  const idx = accounts.findIndex(account => account._id === accountForm._id)

  if (index === -1) {
    accountForm._id = ''
    accountForm.email = ''
    accountForm.phone = ''
    accountForm.nickname = ''
    accountForm.password = ''
    accountForm.confirmPassword = ''
    accountForm.loading = false
    accountForm.index = -1
  } else {
    accountForm._id = accountForm[idx]._id
    accountForm.email = accountForm[idx].email
    accountForm.phone = accountForm[idx].phone
    accountForm.nickname = accountForm[idx].nickname
    accountForm.password = accountForm[idx].password
    accountForm._id = accountForm[idx]._id
    accountForm.loading = false
    accountForm.index = idx
  }
  accountForm.dialog = true
}
</script>

<template>
  <q-page id="manage_account" padding>
    <div class="container">
      <div class="row">
        <div class="col-12 flex items-center">
          <h4 class="q-pr-xl">帳號管理</h4>
          <q-btn class="add_btn" label="新增帳號" @click="openDialog(-1)" />
        </div>
        <!-- account table -->
        <div class="col-12">
          <q-table title="Account Management"></q-table>
        </div>
      </div>

      <q-dialog class="dialog" v-model="accountForm.dialog" persistent>
        <q-layout container>
          <q-card flat>
            <q-form @submit="onSubmit">
              <q-card-section class="flex justify-end">
                <q-btn push icon="mdi-close" v-close-popup />
              </q-card-section>
              <div class="text-h4 text-center q-mb-md">
                {{ accountForm._id > 0 ? "編輯帳號" : "新增帳號" }}
              </div>
              <q-card-section>
                <div class="row">
                  <!-- e-mail -->
                  <div class="input col-12">
                    <q-input
                      rounded
                      standout
                      bottom-slots
                      v-model="accountForm.email"
                      label="E-mail"
                      :rules="[rules.email, rules.required]"
                    >
                      <template v-slot:prepend>
                        <q-icon name="mdi-email" />
                      </template>

                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="accountForm.email = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- phone -->
                  <div class="input col-12">
                    <q-input
                      rounded
                      standout
                      bottom-slots
                      v-model="accountForm.phone"
                      label="Phone"
                      :rules="[rules.phone, rules.required]"
                    >
                      <template v-slot:prepend>
                        <q-icon name="mdi-cellphone" />
                      </template>
                      <template v-slot:append v-if="accountForm.phone">
                        <q-icon
                          name="close"
                          @click="accountForm.phone = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- nickname -->
                  <div class="input col-12">
                    <q-input
                      rounded
                      standout
                      bottom-slots
                      v-model="accountForm.nickname"
                      label="NickName"
                      :rules="[rules.nickname, rules.required]"
                    >
                      <template v-slot:prepend>
                        <q-icon name="mdi-draw" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="accountForm.nickname = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- password -->
                  <div class="input col-12">
                    <q-input
                      rounded
                      standout
                      bottom-slots
                      v-model="accountForm.password"
                      label="Password"
                      :rules="[rules.length, rules.required]"
                      :type="accountForm.isPwd ? 'password' : 'text'"
                    >
                      <template v-slot:prepend>
                        <q-icon name="mdi-lock" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="accountForm.password = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- confirmPassword -->
                  <div class="input col-12">
                    <q-input
                      rounded
                      standout
                      bottom-slots
                      v-model="accountForm.confirmPassword"
                      label="Confirm Password"
                      :rules="[
                        rules.length,
                        rules.confirmPassword,
                        rules.required,
                      ]"
                      :type="accountForm.isPwd ? 'password' : 'text'"
                    >
                      <template v-slot:prepend>
                        <q-icon name="mdi-check-all" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="accountForm.confirmPassword = ''"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions class="flex flex-center">
                <q-btn
                  class="submit_btn q-mb-sm"
                  type="submit"
                  :label="accountForm._id.length > 0 ? '編輯' : '新增'"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-layout>
      </q-dialog>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.input {
  padding-bottom: 1rem;
}
.add_btn,
.submit_btn {
  color: $dark;
  background-color: $primary;
  border-radius: 8px;
  transition: 0.5s;
  &:hover {
    color: $primary;
    background-color: $dark;
    border: 1px solid $primary;
  }
}
.submit_btn {
  font-size: 16px;
  padding: 0 15px;
}
</style>
