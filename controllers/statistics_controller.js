import asyncWrapper from "../middlewares/async_wrapper.js";
import { OK } from "../constants/status_codes.js";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllStatistics = asyncWrapper(
    async (req,res) => {

        const usersCount = await prisma.user.count()
        const rulesCount = await prisma.rule.count()
        const placesCount = await prisma.place.count()
        const brandsCount = await prisma.brand.count()
        const colorsCount = await prisma.color.count()
        const carsCount = await prisma.registeredCar.count()
        const violationsCount = await prisma.violation.count()
        const partnersCount = await prisma.partner.count()

        const data = {
            usersCount,
            rulesCount,
            placesCount,
            brandsCount,
            colorsCount,
            carsCount,
            violationsCount,
            partnersCount
        }


        return res.status(OK).json(data)
    }
)