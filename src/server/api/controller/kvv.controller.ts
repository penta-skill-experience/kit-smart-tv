import {Request, Response} from "express";
import {putKvv} from "../services/kvv.services";

export function putKvvHandler(req: Request, res: Response): void {
    putKvv(req.body)
        .then(o => res.send(o))
        .catch(reason => res.status(400).send(reason));
}
