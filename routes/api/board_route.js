import { Router } from "express";
import { createBoard, deleteAllBoards, deleteBoard, getAllBoards, getBoard, updateBoard } from "../../controllers/board_controller.js";

const router = Router()

router.get('/boards', getAllBoards)
router.get('/boards/:id', getBoard)

router.post('/boards', createBoard)
router.put('/boards/:id', updateBoard)

router.delete('/boards/:id', deleteBoard)
router.delete('/boards', deleteAllBoards)


export default router