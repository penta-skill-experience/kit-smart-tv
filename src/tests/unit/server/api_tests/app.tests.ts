import express, {Request, Response} from "express";
import * as request from "supertest";
import {serverSetup} from "../../../../server/api/app";
import {debug} from "util";

let server = undefined;

beforeAll( () => {
    server = serverSetup(process.env.MONGO_URI);
});

afterAll( () => {
    server.close();
})

describe("healthcheck", () => {
    it("GET /healthcheck - success", async () => {
        debug("hi");
        request(server).get("/healthcheck").expect(200); //looks for
        debug('hu');
    });
});