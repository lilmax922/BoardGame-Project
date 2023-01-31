import { Router } from 'express'
import content from '../middleware/content.js'
import { register, teamup } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register, teamup)

export default router
