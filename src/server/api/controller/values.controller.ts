import {Request, Response} from "express";
import {createValues, getValues, updateValues} from "../services/values.services";

export async function updateValuesHandler(req: Request, res: Response) {
    try {
        return res.send(await updateValues(req.body));
    } catch (e) {
        try {
            return res.send(await createValues(req.body));
        } catch (e) {
            return res.status(400).send(`could not create Config data: ${e.message}`);
        }
    }
}


export async function getValuesHandler(req: Request, res: Response){
    try {
        return res.send(await getValues());
    }
    catch(e: any){
        return res.status(501).send(`could not get Config data: ${e.message}`);
    }
}