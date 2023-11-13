import { Types } from "mongoose";

export interface UserInterface{
    _id?: Types.ObjectId,
    identifier: string,
    password: string,
    name: string,
}

export interface UserUpdateInterface extends UserInterface{
    identifier: string | undefined,
    name: string | undefined,
    password: string | undefined
}