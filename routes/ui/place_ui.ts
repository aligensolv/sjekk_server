import { Router } from "express";
import PlaceRepository from "../../repositories/Place";
import { PlaceInterface } from "../../interfaces/place_interface";
import { OK } from "../../constants/status_codes";

const router: Router = Router()

router.get('/places',async (req, res) => {
    try{
        let places: PlaceInterface[] = await PlaceRepository.getAllPlaces();
        return res.status(OK).render('places/read', {
            places: places
        });
    }catch(err){

    }
})

export default router