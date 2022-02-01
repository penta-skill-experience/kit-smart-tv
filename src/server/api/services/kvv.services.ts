import {DocumentDefinition} from "mongoose";
import {KvvDocument} from "../models/kvv.model";
import * as fs from "fs";
import {exec} from "child_process";
import path from "path";

const kvvDataFilePath = path.resolve(__dirname, "./kvv.json");

console.log(`Location for kvv.json is ${kvvDataFilePath}`);

/**
 * List of all platforms (operating systems)
 * that this service can run on.
 */
const allowedPlatforms = [
    "darwin",  // macOS
    "linux",
];

const runningOnCorrectPlatform: boolean = allowedPlatforms.includes(process.platform);

export function putKvv(input: DocumentDefinition<KvvDocument>): Promise<string> {
    return runKvvCommand(input.url.toString());
}

function runKvvCommand(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (runningOnCorrectPlatform) {
            const command = `curl "${url}"`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            });
        } else {
            reject(`Server platform is "${process.platform}", `
                + `but must be one of ${JSON.stringify(allowedPlatforms)} to support accessing the KVV API.`);
        }
    });
}