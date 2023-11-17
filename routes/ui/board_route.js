import { Router } from "express";
import uiAsyncWrapper from "../../middlewares/front_async_wrapper.js";
import BoardRepository from "../../repositories/Board.js";
import { OK } from "../../constants/status_codes.js";

const router = Router()

router.get('/boards', uiAsyncWrapper(
    async (req, res) => {
        let boards = await BoardRepository.getAllBoards();
        return res.status(OK).render('boards/read',{
            boards: boards
        })
    }
))

router.get('/boards/create', uiAsyncWrapper(
    async (req, res) => {
        return res.status(OK).render('boards/create')
    }
))

router.get('/boards/:id/update', uiAsyncWrapper(
    async (req, res) => {
        const {id} = req.params
        let board = await BoardRepository.getBoard(id)
        return res.status(OK).render('boards/update', {
            board: board
        })
    }
))

export default router