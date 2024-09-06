import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import TimeRepository from "./Time.js"

class ApartmentRepository{

    static prisma = PrismaClientService.instance
    static getAllApartment(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.place.findMany({
                        where: {
                            place_type: 'apartment'
                        },
                        include: {
                            apartment: true
                        }
                    })
                    return resolve(places)
                }
            )
        )
    }

    static getApartmentsByResidentialQuarter = async ({ residential_quarter_id }) => new Promise(
        promiseAsyncWrapper(
            async (resolve) =>{
                const places = await this.prisma.apartment.findMany({
                    where: {
                        residential_quarter_id: +residential_quarter_id
                    }
                })
                return resolve(places)
            }
        )
    )

    static createApartment({ location, policy, code }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) => {
                    const place = await this.prisma.place.create({
                        data: {
                            location,
                            policy,
                            code,
                            place_type: 'apartment',
                            created_at: TimeRepository.getCurrentTime(),
                            apartment: {
                                create: {
                                    location,
                                    policy,
                                    code,
                                }
                            }
                        }
                    })

                    return resolve(place)
                }
            )
        )
    }
}

export default ApartmentRepository