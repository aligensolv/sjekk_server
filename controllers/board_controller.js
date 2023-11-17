import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import BoardRepository from "../repositories/Board.js";

export const getAllBoards = asyncWrapper(
    async (req,res) => {
        let boards = await BoardRepository.getAllBoards();
        return res.status(OK).json(boards);
    }
)

export const getBoard = asyncWrapper(
    async (req,res) => {
        const {id} = req.body
        let board = await BoardRepository.getBoard(id)
        return res.status(OK).json(board)
    }
)

export const createBoard = asyncWrapper(
    async (req,res) => {
        const data = req.body
        let board = await BoardRepository.createBoard(data)
        return res.status(OK).json(board)
    }
)

export const updateBoard = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body

        let update_result = await BoardRepository.updateBoard(id, data)
        return res.status(OK).json(update_result)
    }
)

export const deleteBoard = asyncWrapper(
    async (req,res) => {
        let delete_result = await BoardRepository.deleteBoard(id)
        return res.status(OK).json(delete_result)
    }
)

export const deleteAllBoards = asyncWrapper(
    async (req,res) => {
        await BoardRepository.deleteAllBoards()
        return res.status(OK).json(true)
    }
)