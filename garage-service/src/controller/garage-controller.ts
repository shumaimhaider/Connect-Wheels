import { Request, Response } from "express";
import { validationResult } from "express-validator";

import garageService from "../service/garage-service";
import { GarageDTO } from '../dtos/garage-dto';
import { checkUserGrpc } from "../grpc/services/user-grpc-service";



const createGarage = async (req: Request, res: Response) => {
  // Validation request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const garageData: GarageDTO = {
    name: req?.body?.garageName,
    ownerId: req?.body?.userID,
    pictureUrl: req?.body?.pictureURL || "",
  };

  try {
    const userExists = await checkUserGrpc(garageData.ownerId);
    if (!userExists) {
      throw new Error('User does not exist');
    }
    const result = await garageService.createGarage(garageData)
    return res.status(200).json({
      result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'error creating garage', error: error });
  }
}


const controller = {
  createGarage,
}

export default controller