import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { CreateListing } from '../controllers/listing.controller.js'

const router = express.Router()

router.post('/create', verifyToken, CreateListing)

export default router