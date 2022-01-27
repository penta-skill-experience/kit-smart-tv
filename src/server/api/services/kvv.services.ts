import {DocumentDefinition} from "mongoose";
import {KvvDocument} from "../models/kvv.model";
import {execSync} from 'child_process';
import * as fs from 'fs';


export async function getKvv(input: DocumentDefinition<KvvDocument>){
    const command = `rm ../kvv.json | curl -o ../kvv.json "${input.url}"`
    await execSync(command);
    let rawData = fs.readFileSync('../kvv.json');
    return JSON.parse(rawData.toString());
}