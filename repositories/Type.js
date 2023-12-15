import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import TypeModel from "../models/Type.js";

class TypeRepository{
    static getAllCarTypes() {
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const types = await TypeModel.find()
                    return resolve(types)
                }
            )
        )
    }

    static createCarType(carType) {
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    let newCarType = await TypeModel.create({
                        value: carType
                    })

                    return resolve(newCarType != null)
                }
            )
        )
    }

    static deleteCarType(id){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    let result = await TypeModel.deleteOne({
                        _id: id
                    })

                    return resolve(result.deletedCount > 0)
                }
            )
        )
    }
}

export default TypeRepository