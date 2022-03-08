import createServer from "../../../../server/api/utils/server";
import supertest from "supertest";
import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {createAdmin, getAdmin} from "../../../../server/api/services/admin.service";
import {AdminInput} from "../../../../server/api/models/admin.model";
import {Express} from "express";
import {createWidgetData} from "../../../../server/api/services/widgetData.service";
import {WidgetDataData} from "../../../../shared/interfaces/interfaces";
import {createSession} from "../../../../server/api/services/session.service";
import {signJwt} from "../../../../server/api/utils/jwt.utils";
import config from "../../../../server/api/config.json";
import {Announcement} from "../../../../shared/values/Announcement";
import {createAnnouncements} from "../../../../server/api/services/announcements.services"

describe("GET routines", () => {
    let app: Express;
    const testPassword = "password1234";
    let admin : AdminInput = {
        password: testPassword,
    };
    let adminTmp;
    let adminId;
    let sessionTest;
    let accessTokenTest;


    beforeAll(async () => {
        app = createServer();
    });

    afterAll(() => {

    });

    beforeEach(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        // fill database with content
        await createAdmin(admin);
        adminTmp = await getAdmin();
        adminId = adminTmp.toJSON()._id;
        sessionTest = await createSession(adminId, "user agent");
        accessTokenTest = signJwt({ ...adminTmp, session: sessionTest._id },
            "accessTokenPrivateKey",
            { expiresIn: config.accessTokenTtl})


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

        const announcements: Announcement[] = [
                {
                    title: "Awesome work everyone!",
                    text: "What a fine product! Such WOW! Much 1,0!!",
                    author: "bach.jannik@web.de",
                    timeout: 1645137628851,
                    timeOfAddition: 1643927628851
                }
            ]

        await createAnnouncements(announcements);


    });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    test("get session", async () => {

        const response = await supertest(app).get("/api/sessions").set("Authorization", `Bearer ${accessTokenTest}`);
        expect(response.statusCode).toBe(200);
        const expectedSessionData = {
            session: {
                _id: expect.any(String),
                admin: expect.any(String),
                valid: true,
                userAgent: 'user agent',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                __v: 0
            },
            valid_until: expect.any(String)
        };

        expect(response.body).toEqual(expectedSessionData);
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

    test("get healthcheck", async () => {
        const {statusCode} = await supertest(app)
            .get("/healthcheck")
            .send();
        expect(statusCode).toBe(200);
    });


    test("get announcements", async () => {
        const response = await supertest(app).get("/announcements");
        expect(response.statusCode).toBe(200);
        const announcementDataList = response.body;
        const expectedAnnouncementData = [
            {
                title: 'Awesome work everyone!',
                text: 'What a fine product! Such WOW! Much 1,0!!',
                author: 'bach.jannik@web.de',
                timeout: 1645137628851,
                timeOfAddition: 1643927628851,
                _id: expect.any(String),
            }
        ];
        expect(announcementDataList).toEqual(expectedAnnouncementData);
    });



});