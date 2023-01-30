import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema(
  {
    participant: {
      type: ObjectId,
      required: [true, '缺少報名人']
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: [true, '缺少活動開始時間']
    },
    endDate: {
      type: Date,
      default: Date.now,
      required: [true, '缺少活動結束時間']
    },
    price: {
      type: Number,
      required: [true, '缺少報名金額']
    }
  }
)

export default model('event', schema)
