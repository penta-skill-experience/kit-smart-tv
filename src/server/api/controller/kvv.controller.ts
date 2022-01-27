import {Request, Response} from "express";
import {getKvv} from "../services/kvv.services";




export async function getKvvHandler(req: Request, res: Response) {
    try{
        const json = await getKvv(req.body);
        res.send(json);
    }
    catch (e: any){
        res.status(400).send(e.message);
    }
}


