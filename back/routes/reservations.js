import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { createReservation, getReservation, getAllReservations, editReservation, deleteReservation } from '../controllers/reservations.js'

const router = Router()

router.post('/getdate', content('application/json'), jwt, getReservation)
router.post('/', content('application/json'), jwt, createReservation)
router.get('/all', jwt, admin, getAllReservations)
router.patch('/delete/:id', content('application/json'), jwt, admin, deleteReservation)
router.patch('/:id', content('application/json'), jwt, admin, editReservation)
// router.get('/:id', jwt, getReservation)

export default router
