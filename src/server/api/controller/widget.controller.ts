import {Request, Response} from "express";
import {createWidgetData, updateWidgetData} from "../services/widgetData.service";

export async function createWidgetDataHandler(req: Request, res: Response) {
    console.debug(req.body);
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