import { Schema, model, ObjectId } from 'mongoose'
// import validator from 'validator'

const schema = new Schema(
  {
    reserver: {
      type: ObjectId,
      ref: 'users',
      required: [true, '缺少預約人']
    },
    // reserverName: {
    //   type: String,
    //   trim: true
    // },
    // reserverPhone: {
    //   type: String,
    //   trim: true,
    //   validate: {
    //     validator (phone) {
    //       return validator.isMobilePhone(phone, 'zh-TW')
    //     },
    //     message: '手機號碼格式錯誤'
    //   }
    // },
    startDate: {
      type: Date,
      default: Date.now, // 當下時間戳記 ; Date.now() 會變成 server 打開的時間導致每個時間都一樣
      required: [true, '缺少預約時間']
    },
    // endDate: {
    //   type: Date,
    //   default: Date.now,
    //   required: [true, '缺少預計結束時間']
    // },
    period: {
      type: Number,
      default: 1,
      required: [true, '缺少預約時數']
    },
    totalPeople: {
      type: Number,
      default: 1,
      required: [true, '缺少預約人數']
    }
  }
)

export default model('reservations', schema)
