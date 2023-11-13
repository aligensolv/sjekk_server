import { Request, Response, Router } from "express";
import { INTERNAL_SERVER, OK } from "../../constants/status_codes";
import UserRepository from "../../repositories/User"
import { identifier } from "../../constants/custom_types";
import { UserInterface } from "../../interfaces/user_interface";

const router: Router = Router()

router.get('/users', async (req: Request, res: Response) => {
    try{
        let users = await UserRepository.getAllUsers()
        return res.status(OK).render('users/read',{
            users: users
        })
    }catch(error){
        return res.status(INTERNAL_SERVER).render('errors/500',{
            error: error
        })
    }
})

router.get('/users/:id/update', async (req: Request<identifier>, res: Response) => {
    try{
        const { id } = req.params
        let user: UserInterface = await UserRepository.getUser(id)
        

        return res.status(OK).render('users/update',{
            user: user
        })
    }catch(error){
        console.log(error.message);
        
        return res.status(INTERNAL_SERVER).render('errors/500',{
            error: error.message
        })
    }
})


router.get('/users/create', (req: Request, res: Response) => {
    return res.status(OK).render('users/create')
})

export default router