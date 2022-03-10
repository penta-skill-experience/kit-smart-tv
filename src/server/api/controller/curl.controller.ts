import {Request, Response} from "express";
import {putCurl} from "../services/curl.services";

export function putCurlHandler(req: Request, res: Response): void {
    putCurl(req.body)
        .then(o => res.send(o))
        .catch(reason => res.status(400).send(reason));
}
