import { NOT_FOUND } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import moment from "moment";
import ViolationHelperRepository from "./ViolationHelper.js";
import UserRepository from "./User.js";
import PlaceRepository from "./Place.js";
import { account_number, iban_numner, kid_number, swift_code } from "../config.js";
import PrismaClientService from "../utils/prisma_client.js";
import TimeRepository from "./Time.js";

class ViolationRepository{
    static prisma = PrismaClientService.instance

    static getAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve) =>{
                const violations = await this.prisma.violation.findMany({
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        place: true,
                        creaated_by: true
                    }
                })
                return resolve(violations)
            }
        ))
    }

    static getViolationsCount(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const count = await this.prisma.violation.count()
                return resolve(count)
            }
        ))
    }


    // static updateViolation(id, data){
    //     return new Promise(promiseAsyncWrapepr(
    //         async(resolve, reject) =>{
    //             let result = await Violation.updateOne({_id: id}, data)

    //             return resolve(result.modifiedCount)
    //         }
    //     ))
    // }

    static getAllPlaceViolations({ place_id, session_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const violations = await this.prisma.violation.findMany({
                    where: {
                        place_id: +place_id,
                        session_id
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        place: true,
                        created_by: true,
                        registered_car: true,
                        rules: {
                            include: {
                                extras_values: true
                            }
                        },
                        plate_info: true,
                        ticket_info: true,
                        images: true
                    }
                })

                console.log(violations);
                
                return resolve(violations)
            }
        ))
    }

    static getAllUserViolations({ user_id, session_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const violations = await this.prisma.violation.findMany({
                    where: {
                        user_id: +user_id,
                        session_id
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        place: true,
                        created_by: true,
                        registered_car: true,
                        rules: {
                            include: {
                                extras_values: true
                            }
                        },
                        images: true,
                        plate_info: true,
                        ticket_info: true
                    }
                })

                console.log(violations);
                
                return resolve(violations)
            }
        ))
    }

    static getViolation({ violation_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const violation = await this.prisma.violation.findUnique({
                    where: {
                        id: +violation_id
                    },
                    include: {
                        place: true,
                        created_by: true,
                        registered_car: true,
                        rules: {
                            include: {
                                extras_values: true
                            }
                        },
                        images: true,
                        plate_info: true,
                        ticket_info: true
                    }
                })

                return resolve(violation)
            }
        ))
    }

    static createViolation({
        user_id, pnid, ticket_comment, system_comment, place, rules, session_id,
        images, plate_info, is_car_registered, registered_car, place_login_time, print_option
    }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve) =>{
                let created_at = await TimeRepository.getCurrentTime()
                let ticketNumber = ViolationHelperRepository.generateTicketNumber()
                
                const total_charge = rules.reduce((acc,val) => acc + val.charge, 0)

                const serial_number = ViolationHelperRepository.generateRealSerialNumber()
                let barcode_image = await ViolationHelperRepository.generateTicketBarcode(serial_number)

                const { car_model, plate_number, manufacture_year, car_description, car_type, car_color, country_name, country_code   } = plate_info
                const { location, code, policy, id: place_id } = place

                let ticket_image = await ViolationHelperRepository.generateTicketImage(ticketNumber,barcode_image,{
                    ticket_number: ticketNumber,
                    rules: rules,
                    ticket_comment: ticket_comment,
                    to_date: created_at,
                    pnid: pnid,
                    print_option,
                    place_login_time,
                    car_info:{
                        car_model,
                        plate_number,
                        manufacture_year,
                        car_description,
                        car_type,
                        car_color,
                        country_name,
                        country_code
                    },
                    location: location,
                    ticket_info:{
                        total_charge: total_charge,
                        paid_to: 'Sjekk Kontroll',
                        account_number: account_number,
                        kid_number: kid_number,
                        swift_code: swift_code,
                        iban_number: iban_numner,
                        payment_date: created_at,
                    }
                })


                const created = await this.prisma.violation.create({
                    data: {
                        user_id: +user_id,
                        ticket_comment,
                        system_comment,
                        place_id: +place_id,
                        images: {
                            create: images.map(image => ({
                                path: image.path,
                                date: image.date
                            }))
                        },
                        created_at,
                        place_login_time,
                        print_option,
                        total_charge,
                        ticket_info: {
                            create: {
                                ticket_number: ticketNumber,
                                ticket_image,
                                print_option,
                                barcode_image,
                                serial_number,
                                created_at
                            }
                        },
                        rules: {
                            create: [
                                ...rules.map(rule => ({
                                    ...rule,
                                    extras_values: {
                                        create: rule.extras_values
                                    },
                                    extras: {
                                        create: rule.extras
                                    },
                                    id: undefined
                                }))
                            ]
                        },
                        plate_info: {
                            create: {
                                car_model,
                                plate_number,
                                manufacture_year,
                                car_description,
                                car_type,
                                car_color,
                                country_name,
                                country_code
                            }
                        },
                        is_car_registered,
                        registered_car_id: registered_car.id,
                        session_id: session_id,
                    }
                })

                return resolve(created)
            }
        ))
    }

    static deleteViolation({ violation_id }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                const deleted_at = await TimeRepository.getCurrentTime()
                const deleted = await this.prisma.violation.update({
                    where: {
                        id: +violation_id
                    },
                    data: {
                        deleted_at
                    }
                })

                return resolve(true)
            }
        ))
    }

    static deleteAllViolations(){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                await Violation.deleteMany({})
                return resolve(true)
            }
        ))
    }

    static addImage({ violation_id, image}){
        return new Promise(promiseAsyncWrapepr(
            async(resolve, reject) =>{
                await this.prisma.violation.update({
                    where: {
                        id: +violation_id
                    },
                    data: {
                        images: {
                            create: {
                                path: image.path,
                                date: image.date
                            }
                        }
                    }
                })
                return resolve(image)
            }
        ))
    }

    static getTicketPreview({
        pnid, ticket_comment, place, rules, plate_info
    }){
        return new Promise(promiseAsyncWrapepr(
            async(resolve) =>{
                let created_at = TimeRepository.getCurrentTime()
                let ticketNumber = ViolationHelperRepository.generateTicketNumber()
                
                const total_charge = rules.reduce((acc,val) => acc + val.charge, 0)

                const serial_number = ViolationHelperRepository.generateRealSerialNumber()
                let barcode_image = await ViolationHelperRepository.generateTicketBarcode(serial_number)

                const { car_model, plate_number, manufacture_year, car_description, car_type, car_color, country_name, country_code   } = plate_info
                const { location, code, policy, id: place_id } = place

                let ticket_image = await ViolationHelperRepository.generateTicketImage(ticketNumber,barcode_image,{
                    ticket_number: ticketNumber,
                    rules: rules,
                    ticket_comment: ticket_comment,
                    from_date: created_at,
                    to_date: created_at,
                    pnid: pnid,
                    print_option: 'hand',
                    car_info:{
                        car_model,
                        plate_number,
                        manufacture_year,
                        car_description,
                        car_type,
                        car_color,
                        country_name,
                        country_code
                    },
                    location: location,
                    ticket_info:{
                        total_charge: total_charge,
                        paid_to: 'Sjekk Kontroll',
                        account_number: account_number,
                        kid_number: kid_number,
                        swift_code: swift_code,
                        iban_number: iban_numner,
                        payment_date: created_at,
                    }
                })

                return resolve(ticket_image)
            }
        ))
    }
}

export default ViolationRepository