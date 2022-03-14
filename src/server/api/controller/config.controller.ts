import {Request, Response} from "express";
import {createConfig, getConfig, updateConfig} from "../services/config.services";

export async function updateConfigHandler(req: Request, res: Response) {
    try {
        return res.send(await updateConfig(req.body));
    } catch (e) {
        try {
            return res.send(await createConfig(req.body));
        } catch (e) {
            return res.status(400).send(`could not create Config data: ${e.message}`);
        }
    }
}


export async function getConfigHandler(req: Request, res: Response) {
    try {
        return res.send(await getConfig());
    } catch (e: any) {
        return res.status(501).send(`could not get Config data: ${e.message}`);
    }
}