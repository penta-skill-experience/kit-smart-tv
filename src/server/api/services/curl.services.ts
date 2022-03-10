import {DocumentDefinition} from "mongoose";
import {CurlDocument} from "../models/curl.model";
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

export function putCurl(input: DocumentDefinition<CurlDocument>): Promise<string> {
    return runCurlCommand(input.url.toString());
}

function runCurlCommand(url: string): Promise<string> {
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
                + `but must be one of ${JSON.stringify(allowedPlatforms)} to support the "curl" command.`);
        }
    });
}