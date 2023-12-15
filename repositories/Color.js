import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Color from "../models/Color.js";

class ColorRepository{
    static getAllColors(){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const colors = await Color.find()
                    return resolve(colors)
                }
            )
        )
    }

    static createColor(color){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const newColor = await Color.create({
                        value: color
                    })

                    return resolve(newColor != null)
                }
            )
        )
    }
    
    static deleteColor(id) {
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    let result = await Color.deleteOne({
                        _id: id
                    })

                    return resolve(result.deletedCount > 0)
                }
            )
        )
    }
}

export default ColorRepository