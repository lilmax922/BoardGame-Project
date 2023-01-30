import { Schema, model } from 'mongoose'

const descSchema = new Schema({
  introduction: {
    type: String,
    required: [true, '缺少桌遊介紹']
  },
  components: {
    type: String,
    required: [true, '缺少遊戲配件']
  },
  setUp: {
    type: String,
    required: [true, '缺少遊戲設置']
  },
  playingTheGame: {
    type: String,
    required: [true, '缺少遊戲流程']
  },
  endingTheGame: {
    type: String,
    required: [true, '缺少遊戲結束說明']
  }
})

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少桌遊名稱']
    },
    images: {
      type: [String],
      required: [true, '缺少桌遊圖片'],
      default: []
    },
    type: {
      type: [String],
      required: [true, '缺少桌遊類型'],
      enum: {
        value: ['派對', '陣營', '策略', '心機', '卡牌', '兒童', '家庭', '抽象'],
        message: '桌遊類型錯誤'
      },
      default: []
    },
    description: {
      type: [descSchema],
      required: [true, '缺少桌遊詳細說明'],
      default: []
    },
    players: {
      type: Number,
      required: [true, '缺少遊玩人數']
    },
    playingTime: {
      type: Number,
      required: [true, '缺少遊戲時間']
    },
    age: {
      type: Number,
      required: [true, '缺少適合年齡']
    },
    ytVideo: {
      type: String
    }
  }, { versionKey: false })

export default model('boardgames', schema)
