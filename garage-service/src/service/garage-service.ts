import { AppDataSource } from "../data-source";
import { Garage } from "../entity/garage";
import { GarageDTO } from '../dtos/garage-dto';


export const createGarage = async (garageData: GarageDTO) => {
    try {
        const garageModel = AppDataSource.getRepository(Garage);
        const garage = await garageModel.save({
            ...garageData,
        });

        return { message: "Garage created successfully", garageID: garage?.id };
    } catch (error) {
        console.error(error);
        throw error
    }
};


const garageService = {
    createGarage
};


export default garageService;
