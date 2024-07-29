import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import PrismaClientService from "../utils/prisma_client.js"
import TimeRepository from "./Time.js"

class ResidentialPlaceRepository{

    static prisma = PrismaClientService.instance
    static getAllResidentialQuarters(){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) =>{
                    const places = await this.prisma.residentialQuarter.findMany({
                        include: {
                            place: true
                        }
                    })
                    console.log(places);
                    return resolve(places)
                }
            )
        )
    }

    static createResidentialQuarter({ location, policy, code }){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve) => {
                    const place = await this.prisma.place.create({
                        data: {
                            location,
                            policy,
                            code,
                            created_at: TimeRepository.getCurrentTime(),
                            place_type: 'residential',
                            residential: {
                                create: {
                                    location,
                                    policy,
                                    code,
                                }
                            }
                        }
                    })

                    const quarter = await this.prisma.residentialQuarter.findFirst({
                        where: {
                            place_id: place.id
                        },

                        include: {
                            place: true
                        }
                    })

                    return resolve(quarter)
                }
            )
        )
    }
}

export default ResidentialPlaceRepository