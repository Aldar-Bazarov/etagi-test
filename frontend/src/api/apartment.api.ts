import { $host } from "./index";

export const getApartmentOnTheFloor = async (floor: number, limit: number = 3, page: number = 1) => {
    try {
        const response = await $host.get(`apartment/floor?floorNumber=${floor}&page=${page}&limit=${limit}`);
        return response
    } catch (error: any) {
        throw error.response.data;
    }
}

export const getOneApartment = async (apartmentId: number) => {
    try {
        const response = await $host.get(`apartment/${apartmentId}`);
        return response
    } catch (error: any) {
        throw error.response.data;
    }
}