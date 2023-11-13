import { Router } from "express"
import { deleteAllUsers, deleteUser, getAllUsers, getUser, registerUser, updateUser } from "../../controllers/user_controller"

const router: Router = Router()

router.get('/users', getAllUsers)
router.get('/users/:id', getUser)

router.put('/users/:id', updateUser)

router.post('/users/register', registerUser)
router.delete('/users/:id', deleteUser)
router.delete('/users', deleteAllUsers)

export default router