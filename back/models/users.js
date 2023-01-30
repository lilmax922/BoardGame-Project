import { Schema, model, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, '缺少暱稱'],
      unique: true,
      default: ''
    },
    phone: {
      type: String,
      required: [true, '缺少手機號碼'],
      unique: true,
      trim: true,
      validate: {
        // 驗證的 function
        validator (phone) {
          return validator.isMobilePhone(phone, 'zh-TW')
        },
        // 錯誤訊息
        message: '手機號碼格式錯誤'
      }
    },
    password: {
      type: String,
      required: true,
      default: ''
    },
    email: {
      type: String,
      required: [true, '缺少電子信箱'],
      unique: true,
      default: '',
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '電子信箱格式錯誤'
      }
    },
    tokens: {
      type: [String],
      default: []
    },
    role: {
      type: Number,
      // 0 = 使用者
      // 1 = 管理員
      default: 0
    }
  }, { versionKey: false }) // 不要紀錄修改次數

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 12) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update // 更新的資料
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 12) {
      // 密碼加鹽 10 次
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default model('users', userSchema)
