import {Request, Response} from "express";
import {putKvv} from "../services/kvv.services";




export async function putKvvHandler(req: Request, res: Response) {
    try{
        const json = await putKvv(req.body);
        res.send(json);
    }
    catch (e: any){
        res.status(400).send(e.message);
    }
}


