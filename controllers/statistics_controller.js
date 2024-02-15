import asyncWrapper from "../middlewares/async_wrapper.js";
import UserModel from "../models/User.js";
import RuleModel from "../models/Rule.js";
import PlaceModel from "../models/Place.js";
import BrandModel from "../models/Brand.js";
import ColorModel from "../models/Color.js";
import CarModel from "../models/Car.js";
import TypeModel from "../models/Type.js";
import { OK } from "../constants/status_codes.js";
import ViolationModel from "../models/Violation.js";
import PartnerModel from "../models/Partner.js";

export const getAllStatistics = asyncWrapper(
    async (req,res) => {
        const usersCount = await UserModel.countDocuments()
        const rulesCount = await RuleModel.countDocuments()
        const placesCount = await PlaceModel.countDocuments()
        const brandsCount = await BrandModel.countDocuments()
        const colorsCount = await ColorModel.countDocuments()
        const carsCount = await CarModel.countDocuments()
        const typesCount = await TypeModel.countDocuments()
        const violationsCount = await ViolationModel.countDocuments()
        const partnersCount = await PartnerModel.countDocuments()

        const data = {
            usersCount,
            rulesCount,
            placesCount,
            brandsCount,
            colorsCount,
            carsCount,
            typesCount,
            violationsCount,
            partnersCount
        }

        console.log(data);

        return res.status(OK).json(data)
    }
)