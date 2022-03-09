import createServer from "../../../../server/api/utils/server";
import supertest from "supertest";
import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {createAdmin, getAdmin} from "../../../../server/api/services/admin.service";
import {AdminInput} from "../../../../server/api/models/admin.model";
import {Express} from "express";
import {createWidgetData} from "../../../../server/api/services/widgetData.service";
import {ConfigData, ValuesData, WidgetDataData} from "../../../../shared/interfaces/interfaces";
import {createSession} from "../../../../server/api/services/session.service";
import {signJwt} from "../../../../server/api/utils/jwt.utils";
import config from "../../../../server/api/config.json";
import {Announcement} from "../../../../shared/values/Announcement";
import {createAnnouncements} from "../../../../server/api/services/announcements.services"
import {createUsers} from "../../../../server/api/services/users.services";
import {IVerifiedUser} from "../../../../shared/values/IVerifiedUser";
import {createConfig} from "../../../../server/api/services/config.services";
import {createValues} from "../../../../server/api/services/values.services";

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
        });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    test("get session with existing session should return 200", async () => {

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

    test("get session without existing session should return 403", async () => {
        const accessTokenWrong = signJwt({...adminTmp, session: (new mongoose.Types.ObjectId().toString())},
            "accessTokenPrivateKey",
            {expiresIn: config.accessTokenTtl})
        const response = await supertest(app).get("/api/sessions").set("Authorization", `Bearer ${accessTokenWrong}`);
        expect(response.statusCode).toBe(403);
    });

    test("get session with out admin should return 403", async () => {
        //create 2nd admin which is not possible from routine calls
        const accessTokenWrong = signJwt({},
            "accessTokenPrivateKey",
            {expiresIn: config.accessTokenTtl})
        const response = await supertest(app).get("/api/sessions").set("Authorization", `Bearer ${accessTokenWrong}`);
        expect(response.statusCode).toBe(403);
    });


    test("get widgets with existing widgets should return 200 and the widgets", async () => {
        //write to database
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


    test("get widgets without existing widgets should return 501", async () => {
        const response = await supertest(app).get("/widgets");
        expect(response.statusCode).toBe(501);
    });


    test("get healthcheck", async () => {
        const {statusCode} = await supertest(app)
            .get("/healthcheck")
            .send();
        expect(statusCode).toBe(200);
    });

    test("get announcements without existing announcements should return 501", async () => {
        const response = await supertest(app).get("/announcements");
        expect(response.statusCode).toBe(501);
    });

    test("get announcements with existing announcements should return 200 and the announcements", async () => {
        // write to database
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

    test("get users without existing users should return 501", async () => {
        const response = await supertest(app).get("/users");
        expect(response.statusCode).toBe(501);
    });

    test("get users with existing users should return 200 and the users", async () => {
        //write users to database
        const users : IVerifiedUser[] = [
            {
                email: "bach.jannik@web.de",
                name: "Jannik"
            },
            {
                email: "uupiw@student.kit.edu",
                name: "UUron"
            }

        ];
        await createUsers(users);

        const response = await supertest(app).get("/users");
        expect(response.statusCode).toBe(200);
        const userDataList = response.body;
        const expectedUserData = [
            {
                _id: expect.any(String),
                email: "bach.jannik@web.de",
                name: "Jannik"
            },
            {
                _id: expect.any(String),
                email: "uupiw@student.kit.edu",
                name: "UUron"
            }
        ];
        expect(userDataList).toEqual(expectedUserData);
    });

    test("get config without existing config should return 501", async () => {
        const response = await supertest(app).get("/config");
        expect(response.statusCode).toBe(501);
    });

    test("get config with existing config should return 200 and the config", async () => {
        //write config to database
        const ConfigData : ConfigData = {
            fontSize: "large",
            colorScheme: "dark",
            background: "https://images.pexels.com/photos/4328298/pexels-photo-4328298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        };
        await createConfig(ConfigData);

        const response = await supertest(app).get("/config");
        expect(response.statusCode).toBe(200);
        const configData = (response.body as ConfigData);
        const expectedConfigData : ConfigData = {
            background: "https://images.pexels.com/photos/4328298/pexels-photo-4328298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            colorScheme: "dark",
            fontSize: "large",
        };
        expect(configData).toEqual(expectedConfigData);
    });


    test("get values without existing values should return 501", async () => {
        const response = await supertest(app).get("/values");
        expect(response.statusCode).toBe(501);
    });

    test("get values with existing values should return 200 and the values", async () => {
        //write values to database

        const valuesDataWrite : ValuesData = {
            "fontSizes": [
                {
                    "id": "small",
                    "name": "small",
                    "relativeSize": 0.8
                },
                {
                    "id": "medium",
                    "name": "medium",
                    "relativeSize": 0.8
                },
                {
                    "id": "large",
                    "name": "large",
                    "relativeSize": 0.8
                }
            ],
            "colorSchemes": [
                {
                    "id": "dark",
                    "name": "dark",
                    "titleFontColor": "white",
                    "bodyFontColor": "white",
                    "specialBoldFontColor": "ForestGreen",
                    "specialSubtleFontColor": "Tomato",
                    "accentBarColor": "rgba(0, 0, 0, 0.5)",
                    "backgrounds": [
                        "https://wallpaperaccess.com/full/1379469.jpg",
                        "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        "https://images.pexels.com/photos/2162442/pexels-photo-2162442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/4328298/pexels-photo-4328298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg",
                        "https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/8824641/pexels-photo-8824641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/9660579/pexels-photo-9660579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ]
                },
                {
                    "id": "light",
                    "name": "light",
                    "titleFontColor": "black",
                    "bodyFontColor": "black",
                    "specialBoldFontColor": "green",
                    "specialSubtleFontColor": "FireBrick",
                    "accentBarColor": "rgba(255,255,255,0.5)",
                    "backgrounds": [
                        "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg",
                        "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/4762392/pexels-photo-4762392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/8849653/pexels-photo-8849653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/9716295/pexels-photo-9716295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    ]
                }
            ]
        }
        await createValues(valuesDataWrite);


        const response = await supertest(app).get("/values");
        expect(response.statusCode).toBe(200);
        const valuesData = (response.body as ValuesData);
        const expectedValuesData = {
            "colorSchemes": [{
                "_id": expect.any(String),
                "accentBarColor": "rgba(0, 0, 0, 0.5)",
                "backgrounds": ["https://wallpaperaccess.com/full/1379469.jpg", "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/2162442/pexels-photo-2162442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/4328298/pexels-photo-4328298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg", "https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/8824641/pexels-photo-8824641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/9660579/pexels-photo-9660579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
                "bodyFontColor": "white",
                "id": "dark",
                "name": "dark",
                "specialBoldFontColor": "ForestGreen",
                "specialSubtleFontColor": "Tomato",
                "titleFontColor": "white"
            }, {
                "_id": expect.any(String),
                "accentBarColor": "rgba(255,255,255,0.5)",
                "backgrounds": ["https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg", "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/4762392/pexels-photo-4762392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/8849653/pexels-photo-8849653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/9716295/pexels-photo-9716295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
                "bodyFontColor": "black",
                "id": "light",
                "name": "light",
                "specialBoldFontColor": "green",
                "specialSubtleFontColor": "FireBrick",
                "titleFontColor": "black"
            }],
            "fontSizes": [{
                "_id": expect.any(String),
                "id": "small",
                "name": "small",
                "relativeSize": 0.8
            }, {
                "_id": expect.any(String),
                "id": "medium",
                "name": "medium",
                "relativeSize": 0.8
            }, {
                "_id": expect.any(String),
                "id": "large",
                "name": "large",
                "relativeSize": 0.8
            }
            ]
        };
        expect(valuesData).toEqual(expectedValuesData);
    });



});