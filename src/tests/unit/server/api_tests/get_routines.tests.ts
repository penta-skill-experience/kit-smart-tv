import createServer from "../../../../server/api/utils/server";
import supertest from "supertest";
import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {createAdmin} from "../../../../server/api/services/admin.service";
import {AdminInput} from "../../../../server/api/models/admin.model";
import {Express} from "express";
import {createWidgetData} from "../../../../server/api/services/widgetData.service";
import {WidgetDataData} from "../../../../shared/interfaces/interfaces";

describe("GET routines", () => {

    let app: Express;

    const testPassword = "password123";
    const testPasswordWrong = "wrongPassword123";

    beforeAll(async () => {
        app = createServer();
    });

    afterAll(() => {

    });

    beforeEach(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        // fill database with content

        const admin: AdminInput = {
            password: testPassword,
        };
        await createAdmin(admin);

        const widgets: WidgetDataData = {
            widgetDataList: [
                {
                    widgetId: "tram-schedule",
                    location: 3,
                    rawConfig: {
                        stop: "Durlacher Tor/K I T (U)",
                        count: 5,
                    },
                },
            ]
        };
        await createWidgetData(widgets);
    });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    test("create new session with correct admin password", async () => {

        // create new session with correct password
        const {statusCode, body} = await supertest(app).post("/api/sessions").send({password: testPassword});

        expect(statusCode).toBe(200);
        const {accessToken, refreshToken} = body;
        expect(typeof accessToken).toBe("string");
        expect(typeof refreshToken).toBe("string");
    });

    test("creating new session with wrong admin password should fail", async () => {
        // create new session with correct password
        const {statusCode} = await supertest(app).post("/api/sessions").send({password: testPasswordWrong});
        expect(statusCode).toBe(401);
    });

    test("update password", async () => {

        const newPassword = "newPassword123";

        // create session with current password
        const response0 = await supertest(app).post("/api/sessions").send({password: testPassword});
        expect(response0.statusCode).toBe(200);
        const {accessToken} = response0.body;

        // set new password
        const response = await supertest(app).put("/admin/update-password").set("Authorization", `Bearer ${accessToken}`).send({
            password: testPassword,
            new_password: newPassword,
        });
        expect(response.statusCode).toBe(200);

        // test if new password works
        const response2 = await supertest(app).post("/api/sessions").send({password: newPassword});
        expect(response2.statusCode).toBe(200);
    });

    test("updating password with current password should fail", async () => {

        // create session with current password
        const response0 = await supertest(app).post("/api/sessions").send({password: testPassword});
        expect(response0.statusCode).toBe(200);
        const {accessToken} = response0.body;

        // try to set new password with same value as current password
        const response = await supertest(app).put("/admin/update-password").set("Authorization", `Bearer ${accessToken}`).send({
            password: testPassword,
            new_password: testPassword,
        });
        expect(response.statusCode).toBe(410);
    });

    test("get widgets", async () => {
        const response = await supertest(app).get("/widgets");
        expect(response.statusCode).toBe(200);
        const widgetDataList = (response.body as WidgetDataData).widgetDataList;
        const expectedWidgetData = {
            "_id": expect.any(String),
            widgetId: "tram-schedule",
            location: 3,
            rawConfig: {
                stop: "Durlacher Tor/K I T (U)",
                count: 5,
            },
        };
        expect(widgetDataList[0]).toEqual(expectedWidgetData);
    });

    // test("should return a 200 status code", async () => {
    //     const {statusCode} = await supertest(app)
    //         .get("/healthcheck")
    //         .send();
    //     expect(statusCode).toBe(200);
    // });
});