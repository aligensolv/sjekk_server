import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import Auth from "./Auth.js";
import TimeRepository from "./Time.js";

class ApartmentRequestRepository {
    static prisma = PrismaClientService.instance

    static getAllApartmentRequests = async () => new Promise(
        promiseAsyncWrapper((resolve,reject) => {
            
        })
    )

    static getApartmentRequestsByResidentialQuarter = async ({ residential_quarter_id }) => new Promise(
        promiseAsyncWrapper(async (resolve,reject) => {
            const requests = await this.prisma.apartmentRequest.findMany({
                where: {
                    residential_quarter_id: +residential_quarter_id
                }
            })
            return resolve(requests)
        })
    )

    static createApartmentRequest = async ({ owner_name, username, password, apartment_number, email, residential_quarter_id }) => new Promise(
        promiseAsyncWrapper(async (resolve,reject) => {
            const searchUsernameExistence = await this.prisma.apartmentRequest.findFirst({
                where: {
                    username
                }
            })

            if(searchUsernameExistence){
                const username_not_unique = new CustomError('Username already exists', 400)
                return reject(username_not_unique)
            }

            const searchEmailExistence = await this.prisma.apartmentRequest.findFirst({
                where: {
                    email
                }
            })

            if(searchEmailExistence){
                const email_not_unique = new CustomError('Email already exists', 400)
                return reject(email_not_unique)
            }

            const searchApartmentNumberExistence = await this.prisma.apartmentRequest.findFirst({
                where: {
                    apartment_number,
                    residential_quarter_id: +residential_quarter_id
                }
            })

            if(searchApartmentNumberExistence){
                const apartment_number_not_unique = new CustomError('Apartment number already exists', 400)
                return reject(apartment_number_not_unique)
            }

            const apartmentRequest = await this.prisma.apartmentRequest.create({
                data: {
                    owner_name: owner_name,
                    username: username,
                    password: await Auth.encryptPassword(password),
                    apartment_number: apartment_number,
                    email: email,
                    created_at: TimeRepository.getCurrentTime(),

                    residential_quarter_id: +residential_quarter_id
                }
            })

            return resolve(apartmentRequest)
        })
    )

    static acceptApartmentRequest = async ({ apartment_request_id }) => new Promise(
        promiseAsyncWrapper(async (resolve,reject) => {
            const apartmentRequest = await this.prisma.apartmentRequest.findUnique({
                where: {
                    id: +apartment_request_id
                }
            })

            if(!apartmentRequest){
                const error = new CustomError('No such apartment request exists', 400)
                return reject(error)
            }

            const created_at = TimeRepository.getCurrentTime()

            const apartment = await this.prisma.apartment.create({
                data: {
                    owner_name: apartmentRequest.owner_name,
                    username: apartmentRequest.username,
                    password: apartmentRequest.password,
                    apartment_number: apartmentRequest.apartment_number,
                    email: apartmentRequest.email,
                    created_at: created_at,
                    residential_quarter_id: +apartmentRequest.residential_quarter_id
                }
            })

            await this.prisma.apartmentRequest.delete({
                where: {
                    id: +apartment_request_id
                }
            })

            return resolve(apartment)
        })
    )

    static rejectApartmentRequest = async ({ apartment_request_id }) => new Promise(
        promiseAsyncWrapper(async (resolve,reject) => {
            const apartmentRequest = await this.prisma.apartmentRequest.findUnique({
                where: {
                    id: +apartment_request_id
                }
            })

            if(!apartmentRequest){
                const error = new CustomError('No such apartment request exists', 400)
                return reject(error)
            }

            await this.prisma.apartmentRequest.delete({
                where: {
                    id: +apartment_request_id
                }
            })

            return resolve(apartmentRequest)
        })
    )
}

export default ApartmentRequestRepository