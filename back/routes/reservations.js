import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
import { createReservation } from '../controllers/reservations.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, createReservation)

export default router
