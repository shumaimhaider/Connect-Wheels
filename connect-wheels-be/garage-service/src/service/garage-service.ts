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


const deleteGarageByOwnerID = async (ownerID: number): Promise<boolean> => {
    const garageRepo = AppDataSource.getRepository(Garage);
    try {
        const deleteResult = await garageRepo.delete({
            ownerId: ownerID
        });

        if (deleteResult.affected === 0) {
            console.log(`No garages found for userId ${ownerID}—nothing to delete.`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting garage:', error);
        throw error
    }
};

const garageService = {
    createGarage,
    deleteGarageByOwnerID
};


export default garageService;
