<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import validator from 'validator'
import { useUserStore } from 'src/stores/user'

const user = useUserStore()
const { editMyself } = user
const { avatar, email, phone, nickname } = storeToRefs(user)

const rules = {
  email (email) {
    return validator.isEmail(email) || '信箱格式錯誤'
  },
  phone (phone) {
    return validator.isMobilePhone(phone, 'zh-TW') || '手機號碼格式錯誤'
  },
  length (value) {
    return (
      (value.length >= 4 && value.length <= 12) || '長度必須為 4 ~ 12 個字'
    )
  }
}

const userForm = reactive({
  phone: phone.value || '',
  nickname: nickname.value || '',
  password: '',
  image: undefined,
  editAvatar: false,
  loading: false
})

const onSubmit = async () => {
  userForm.loading = true

  const fd = new FormData()
  fd.append('avatar', userForm.avatar)
  fd.append('phone', userForm.phone)
  fd.append('nickname', userForm.nickname)
  fd.append('password', userForm.password)
  // fd.append('cardImage')
  await editMyself(fd)
  userForm.loading = false
}
</script>

<template>
  <q-page id="my_info" padding>
    <div class="container">
      <q-form @submit="onSubmit" class="flex flex-center column">
        <div class="row avatar_area">
          <div class="col-12 flex flex-center q-my-xl">
            <q-avatar>
              <q-img :src="avatar" />
            </q-avatar>
            <q-btn
              class="editBtn"
              @click="userForm.editAvatar = true"
              icon="mdi-circle-edit-outline"
              flat
              rounded
              dense
              color="primary"
            />
          </div>
        </div>
        <div class="row flex flex-center q-gutter-md">
          <!-- 信箱 -->
          <div class="input col-12">
            <q-input rounded standout bottom-slots :label="email" readonly>
              <template v-slot:prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>
          </div>
          <!-- 手機號碼 -->
          <div class="input col-12">
            <q-input
              rounded
              standout
              bottom-slots
              v-model="userForm.phone"
              label="Phone"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cellphone" />
              </template>
              <template v-slot:append v-if="userForm.phone">
                <q-icon
                  name="close"
                  @click="userForm.phone = ''"
                  class="cursor-pointer"
                />
              </template>

              <!-- <template v-slot:hint> Field hint </template> -->
            </q-input>
          </div>
          <!-- 暱稱 -->
          <div class="input col-12">
            <q-input
              rounded
              standout
              bottom-slots
              v-model="nickname"
              label="NickName"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-draw" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="nickname = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <!-- 密碼 -->
          <div class="input col-12">
            <q-input
              rounded
              standout
              bottom-slots
              v-model="password"
              label="Password"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-lock-reset" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="password = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 flex justify-center">
            <q-btn class="submit_btn" label="確認修改" type="submit" />
          </div>
        </div>
      </q-form>
      <q-dialog v-model="userForm.editAvatar">
        <q-card style="min-width: 350px">
          <q-card-section>
            <q-file
              v-model="avatar"
              rounded
              standout
              clearable
              label="請選擇大頭貼"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-image-edit" />
              </template>
            </q-file>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
#my_info {
  .row {
    width: 75%;
  }
  .avatar_area {
    position: relative;
    .editBtn {
      position: absolute;
      left: 55%;
      top: 50%;
    }
  }
  .input {
    display: flex;
    justify-content: center;
  }

  .submit_btn {
    font-size: 16px;
    border-radius: 8px;
    color: #fff;
    background-color: $primary;

    &:hover {
      transition: 0.5s;
      color: $primary;
      background-color: $dark;
      border: 1px solid $primary;
    }
  }
}
</style>
