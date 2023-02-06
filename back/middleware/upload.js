import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter (req, file, callback) {
    // 圖檔編碼類型不是 image 開頭的話
    if (!file.mimetype.startsWith('image')) {
      // 建立一個名為 LIMIT_FILE_FORMAT 的錯誤
      callback(new multer.MulterError('LIMIT_FILE_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024 // 大小為 1 MB
  }
})

export default async (req, res, next) => {
  upload.single('image')(req, res, error => {
    if (error instanceof multer.MulterError) {
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(400).json({ success: false, message })
    } else if (error) {
      res.status(500).json({ success: false, message: '未知錯誤' })
    } else {
      next()
    }
  })
}
