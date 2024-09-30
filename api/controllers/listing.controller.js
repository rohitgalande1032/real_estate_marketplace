import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const CreateListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing) {
        return next(404, errorHandler('Listing not found'))
    }

    if(req.user._id === listing.userRef) {
        return next(401, errorHandler('You can only deelete your own listings!'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted')
    } catch (error) {
        next(error)
    }
}