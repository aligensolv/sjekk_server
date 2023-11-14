import { Router } from "express"
import PlaceRepository from "../../repositories/Place.js"
import { OK } from "../../constants/status_codes.js"
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js"

const router = Router()

router.get('/places',uiAsyncWrapper(
    async (req, res) => {
        let places = await PlaceRepository.getAllPlaces();
        return res.status(OK).render('places/read', {
            places: places
        });
    }
))


router.get('/places/:id/update', uiAsyncWrapper(
    async (req, res) => {
        const { id } = req.params
        let place = await PlaceRepository.getPlace(id)
        
    
        return res.status(OK).render('places/update',{
            place: place
        })
    }
))


router.get('/places/create', (req, res) => {
    return res.status(OK).render('places/create')
})

export default router