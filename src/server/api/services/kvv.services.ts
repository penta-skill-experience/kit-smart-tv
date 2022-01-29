import {DocumentDefinition} from "mongoose";
import {KvvDocument} from "../models/kvv.model";
import * as fs from "fs";
import {exec} from "child_process";

/**
 * List of all platforms (operating systems)
 * that this service can run on.
 */
const allowedPlatforms = [
    "darwin",  // macOS
    "linux",
];

const runningOnCorrectPlatform: boolean = allowedPlatforms.includes(process.platform);

export function putKvv(input: DocumentDefinition<KvvDocument>): Promise<object> {
    return runKvvCommand(input.url.toString())
        .then(() => new Promise<object>((resolve, reject) => {
            fs.readFile('../kvv.json', (err, data) => {
                if (err) {
                    reject(err.message);
                } else {
                    try {
                        const json: any = JSON.parse(data.toString());
                        const o = json as object;
                        resolve(o);
                    } catch (e) {
                        reject(`Data returned by KVV API could not be parsed to JavaScript object: ${e.message}`);
                    }
                }
            });
        }));
}

function runKvvCommand(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if (runningOnCorrectPlatform) {
            const command = `rm ../kvv.json | curl -o ../kvv.json "${url}"`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                } else {
                    resolve();
                }
            });
        } else {
            reject(`Server platform is "${process.platform}", `
                + `but must be one of ${JSON.stringify(allowedPlatforms)} to support accessing the KVV API.`);
        }
    });
}