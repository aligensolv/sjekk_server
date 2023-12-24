import { Router } from "express"
import { INTERNAL_SERVER, OK } from "../../constants/status_codes.js";
import UserRepository from "../../repositories/User.js"
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js";

const router = Router()

router.get('/users',uiAsyncWrapper(
    async (req, res) => {
        let users = await UserRepository.getAllUsers()
        return res.status(OK).render('users/read',{
            users: users
        })
    }
))

router.get('/users/report', uiAsyncWrapper(
    async (req, res) => {
        return res.status(OK).render('users/report')
    }
))

router.get('/users/:id/update', uiAsyncWrapper(
    async (req, res) => {
        const { id } = req.params
        let user = await UserRepository.getUser(id)
        
    
        return res.status(OK).render('users/update',{
            user: user
        })
    }
))


router.get('/users/create', (req, res) => {
    return res.status(OK).render('users/create')
})

export default router