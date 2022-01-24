import {Request, Response} from "express";
import {createWidgetData, getWidgetData, updateWidgetData} from "../services/widgetData.service";

export async function updateWidgetDataHandler(req: Request, res: Response) {
    try {
        return res.send(await updateWidgetData(req.body));
    } catch (e) {
        try {
            return res.send(await createWidgetData(req.body));
        } catch (e) {
            return res.status(400).send(`could not create widget data: ${e.message}`);
        }
    }
}


export async function getWidgetDataHandler(req: Request, res: Response){
    try {
        return res.send(await getWidgetData());
    }
    catch(e: any){
        return res.status(501).send(`could not get widget data: ${e.message}`);
    }
}