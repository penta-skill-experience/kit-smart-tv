import {DocumentDefinition} from "mongoose";
import {KvvDocument} from "../models/kvv.model";
import {exec} from 'child_process';
import * as fs from 'fs';


export async function getKvv(input: DocumentDefinition<KvvDocument>){
    const command = `rm ../kvv.json | curl -o ../kvv.json "${input.url}"`
    await exec(command, () => {});
    let rawData = fs.readFileSync('../kvv.json');
    return JSON.parse(rawData.toString());
}