import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema(
  {
    organizer: {
      type: ObjectId,
      ref: 'users',
      required: [true, '缺少揪團發起人']
    },
    participant: {
      type: [ObjectId],
      ref: 'users',
      required: [true, '缺少組隊參加人']
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: [true, '缺少開始時間']
    },
    endDate: {
      type: Date,
      default: Date.now,
      required: [true, '缺少結束時間']
    },
    totalPerson: {
      type: Number,
      required: [true, '缺少總人數']
    },
    type: {
      type: String,
      required: [true, '缺少主要遊玩類型'],
      enum: {
        value: ['派對', '陣營', '策略', '心機', '卡牌', '兒童', '家庭', '抽象'],
        message: '桌遊類型錯誤'
      },
      default: []
    },
    interesting: {
      type: [String],
      enum: {
        value: ['派對', '陣營', '策略', '心機', '卡牌', '兒童', '家庭', '抽象'],
        message: '桌遊類型錯誤'
      },
      default: []
    },
    title: {
      type: String,
      required: [true, '缺少揪團標題'],
      maxLength: [20, '標題最多 20 個字'],
      minLength: [1, '標題最少 1 個字']
    },
    content: {
      type: String,
      required: [true, '缺少揪團內容']
    }
  }
)

export default model('teamups', schema)
