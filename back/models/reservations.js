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
    selectedDate: {
      type: Date,
      default: Date.now, // 當下時間戳記 ; Date.now() 會變成 server 打開的時間導致每個時間都一樣
      required: [true, '缺少預約時間']
    },
    selectedTime: {
      type: String,
      enum: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM']
      // required: [true, '缺少預約時間']
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
    },
    // 0 : 可預約
    // 1 : 不可預約
    status: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
)

export default model('reservations', schema)
