import {Request, Response} from "express";
import {createValues, getValues, updateValues} from "../services/values.services";

export async function updateValuesHandler(req: Request, res: Response) {
    updateValues(req.body)
        .then(result => res.send(result))
        .catch(() => {
            createValues(req.body)
                .then(result => res.send(result))
                .catch(reason => res.status(400).send(`could not create Config data: ${reason}`));
        });
}

export async function getValuesHandler(req: Request, res: Response) {
    try {
        return res.send(await getValues());
    } catch (e: any) {
        return res.status(501).send(`could not get Config data: ${e.message}`);
    }
}