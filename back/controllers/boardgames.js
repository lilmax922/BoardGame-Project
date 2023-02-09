import boardgames from '../models/boardgames.js'

export const createBoardgame = async (req, res) => {
  try {
    console.log(req.files, 'files')
    console.log(req.body)
    // 用文字陣列去 map 重組一個陣列物件包括 image 跟 text
    // const components = req.body.componentsText.map((compText, i) => {
    //   return {
    //     image: req.files.componentImages[i].path,
    //     text: compText
    //   }
    // })

    const result = await boardgames.create({
      introduction: req.body.introduction,
      name: req.body.name,
      // 如果沒上傳圖片的話 req.file 會是 undefined，undefined 沒有 .path，所以要 ?.
      cardImage: req.files?.cardImage[0].path || '',
      mainImages: req.files.mainImages.map(file => file.path),
      types: req.body.types,
      players: req.body.players,
      gameTime: req.body.gameTime,
      age: req.body.age,
      ytVideo: req.body.ytVideo,
      componentImages: req.files.componentImages.map(file => file.path),
      componentTexts: req.body.componentTexts,
      setup: req.body.setup,
      gameFlow: req.body.gameFlow,
      endGame: req.body.endGame,
      post: req.body.post
    })
    res.status(200).json({ success: true, message: '桌遊建立成功', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      res.status(400).json({ success: false, message: '桌遊名稱重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getBoardgame = async (req, res) => {
  try {
    // req.params.id => 路由的 id 參數
    const result = await boardgames.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getAllBoardgames = async (req, res) => {
  try {
    const result = await boardgames.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getPostBoardgames = async (req, res) => {
  try {
    const result = await boardgames.find({ post: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editBoardgame = async (req, res) => {
  try {
    const result = await boardgames.findByIdAndUpdate(req.params.id, {
      introduction: req.body.introduction,
      name: req.body.name,
      // cardImage: req.file?.cardImage[0].path,
      // 如果沒上傳圖片的話 req.file 會是 undefined，undefined 沒有 .path，所以要 ?.
      mainImages: req.files.mainImages.map(file => file.path),
      types: req.body.types,
      players: req.body.players,
      gameTime: req.body.gameTime,
      age: req.body.age,
      ytVideo: req.body.ytVideo,
      componentImages: req.files.componentImages.map(file => file.path),
      componentTexts: req.body.componentTexts,
      setup: req.body.setup,
      gameFlow: req.body.gameFlow,
      endGame: req.body.endGame,
      post: req.body.post
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '桌遊建立成功', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // 代表重複
      console.log(error)
      res.status(400).json({ success: false, message: '桌遊名稱重複' })
    } else if (error.name === 'CastError') {
      res.status(400).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      console.log(error)
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
