import { Types } from "mongoose";

export interface PlaceInterface{
    _id?: Types.ObjectId,
    location: string,
    policy: string,
}

export interface UpdatePlaceInterface extends PlaceInterface{
    location: string | undefined,
    policy: string | undefined,
}
