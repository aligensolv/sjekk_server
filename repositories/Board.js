import moment from "moment";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Board from "../models/Board.js";

class BoardRepository{
    static getAllBoards(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let boards = await Board.find()
                return resolve(boards)
            }
        ))
    }

    static getBoard(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let board = await Board.findOne({ _id:id })
                return resolve(board)
            }
        ))
    }

    static createBoard(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let created_at = moment().format('YYYY-MM-DD HH:mm:ss')
                let board = await Board.create({
                    ...data,
                    created_at: created_at
                })

                return resolve(board)
            }
        ))
    }

    static updateBoard(id,data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                let update_result = await Board.updateOne({_id:id},data)
                return resolve(update_result.modifiedCount > 0)
            }
        ))
    }

    static deleteBoard(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{

                let delete_result = await Board.deleteOne({ _id: id })
                return resolve(delete_result.deletedCount > 0)
            }
        ))
    }

    static deleteAllBoards(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) =>{
                return new Promise(promiseAsyncWrapepr(
                    async (resolve, reject) =>{
                        await Board.deleteMany()
                        return resolve(true)
                    }
                ))   
            }
        ))
    }
}

export default BoardRepository