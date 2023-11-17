import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import AutosysRepository from "../repositories/Autosys.js";

const getPlateInformation = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        let result = await AutosysRepository.getPlateInformation(id)
        return res.status(OK).json(result)
    }
)

export default getPlateInformation