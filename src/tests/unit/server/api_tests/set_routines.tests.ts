import createServer from "../../../../server/api/utils/server";
import supertest from "supertest";
import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {createAdmin, getAdmin} from "../../../../server/api/services/admin.service";
import {AdminInput} from "../../../../server/api/models/admin.model";
import {Express} from "express";
import {createSession} from "../../../../server/api/services/session.service";
import {signJwt} from "../../../../server/api/utils/jwt.utils";
import config from "../../../../server/api/config.json";
import {updateOrCreateAnnouncements} from "../../../../server/api/services/announcements.services";


describe("PUT PUSH DELETE routines", () => {

    let app: Express;
    const testPassword = "password123";
    const testPasswordWrong = "wrongPassword123";
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

        const admin: AdminInput = {
            password: testPassword,
        };
        await createAdmin(admin);

        adminTmp = await getAdmin();
        adminId = adminTmp.toJSON()._id;
        sessionTest = await createSession(adminId, "user agent");
        accessTokenTest = signJwt({...adminTmp, session: sessionTest._id},
            "accessTokenPrivateKey",
            {expiresIn: config.accessTokenTtl});
    });

    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    const testSetRoutine = (routineName: string, setData: any, expectedData: any) => {
        test(`SET ${routineName}`, async () => {
            const setResponse = await supertest(app)
                .put(routineName)
                .set({
                    "Authorization": `Bearer ${accessTokenTest}`,
                    "Content-Type": "application/json"
                })
                .send(setData);
            expect(setResponse.statusCode).toBe(200);

            // test if it was written successfully
            const getResponse = await supertest(app).get(routineName);
            expect(getResponse.statusCode).toBe(200);
            expect(getResponse.body).toEqual(expectedData);
        });
    };

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

    test("updating password with wrong password should fail", async () => {

        // create session with current password
        const response0 = await supertest(app).post("/api/sessions").send({password: testPassword});
        expect(response0.statusCode).toBe(200);
        const {accessToken} = response0.body;

        // try to set new password with same value as current password
        const response = await supertest(app).put("/admin/update-password").set("Authorization", `Bearer ${accessToken}`).send({
            password: "1234",
            new_password: testPassword,
        });
        expect(response.statusCode).toBe(409);
    });

    testSetRoutine("/widgets", {
            widgetDataList: [
                {
                    widgetId: "tram-schedule",
                    location: 3,
                    rawConfig: {
                        stop: "Durlacher Tor/K I T (U)",
                        count: 5,
                    },
                }
            ],
        },
        {
            widgetDataList: [
                {
                    "_id": expect.any(String),
                    widgetId: "tram-schedule",
                    location: 3,
                    rawConfig: {
                        stop: "Durlacher Tor/K I T (U)",
                        count: 5,
                    },
                }
            ],
        });

    testSetRoutine("/users", [
        {
            email: "bach.jannik@web.de",
            name: "Jannik"
        },
        {
            email: "uupiw@student.kit.edu",
            name: "UUron"
        }

    ], [
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
    ]);

    testSetRoutine("/config", {
        fontSize: "large",
        colorScheme: "dark",
        background: "https://images.pexels.com/photos/4328298/pexels-photo-4328298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    }, {
        background: "https://images.pexels.com/photos/4328298/pexels-photo-4328298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        colorScheme: "dark",
        fontSize: "large",
    });

    testSetRoutine("/values", {
        "fontSizes": [
            {
                "id": "1",
                "name": "large",
                "relativeSize": 16
            },
            {
                "id": "2",
                "name": "small",
                "relativeSize": 11
            }
        ],
        "colorSchemes": [
            {
                "id": "1",
                "name": "dark",
                "titleFontColor": "black",
                "bodyFontColor": "black",
                "specialBoldFontColor": "black",
                "specialSubtleFontColor": "black",
                "accentBarColor": "black",
                "backgrounds": ["https://www.test.de/", "https://www.test.com/"],
            },
            {
                "id": "2",
                "name": "light",
                "titleFontColor": "white",
                "bodyFontColor": "black",
                "specialBoldFontColor": "white",
                "specialSubtleFontColor": "white",
                "accentBarColor": "white",
                "backgrounds": ["https://www.test.de/", "https://www.test.com/"],
            }
        ]
    }, {
        "fontSizes": [
            {
                _id: expect.any(String),
                "id": "1",
                "name": "large",
                "relativeSize": 16
            },
            {
                _id: expect.any(String),
                "id": "2",
                "name": "small",
                "relativeSize": 11
            }
        ],
        "colorSchemes": [
            {
                _id: expect.any(String),
                "id": "1",
                "name": "dark",
                "titleFontColor": "black",
                "bodyFontColor": "black",
                "specialBoldFontColor": "black",
                "specialSubtleFontColor": "black",
                "accentBarColor": "black",
                "backgrounds": ["https://www.test.de/", "https://www.test.com/"],
            },
            {
                _id: expect.any(String),
                "id": "2",
                "name": "light",
                "titleFontColor": "white",
                "bodyFontColor": "black",
                "specialBoldFontColor": "white",
                "specialSubtleFontColor": "white",
                "accentBarColor": "white",
                "backgrounds": ["https://www.test.de/", "https://www.test.com/"]
            }
        ]
    });

    test("request with expired accesToken and valid refreshToken", async () => {

        //create expired access token
        const accessTokenExpired = signJwt({...adminTmp, session: sessionTest._id},
            "accessTokenPrivateKey",
            {expiresIn: "-1m"});
        //create valid refreshtoken
        const refreshTokenValid = signJwt({...adminTmp, session: sessionTest._id},
            "refreshTokenPrivateKey",
            {expiresIn: "10m"});

        const {statusCode, header} = await supertest(app).get("/api/sessions").set({
            "Authorization": `Bearer ${accessTokenExpired}`,
            "Content-Type": "application/json",
            "x-refresh": refreshTokenValid,
        });

        expect(statusCode).toBe(200);
        const accessTokenGenerated = header['x-access-token'];
        console.log(accessTokenGenerated);
        expect(typeof accessTokenGenerated).toBe("string");

        const validTokenResponse = await supertest(app).get("/api/sessions").set({
            "Authorization": `Bearer ${accessTokenGenerated}`,
            "Content-Type": "application/json"
        });
        expect(validTokenResponse.statusCode).toBe(200);

    })

    test("request with expired accesToken and expired refreshToken", async () => {

        //create expired access token
        const accessTokenExpired = signJwt({...adminTmp, session: sessionTest._id},
            "accessTokenPrivateKey",
            {expiresIn: "-1m"});
        //create valid refreshtoken
        const refreshTokenExpired = signJwt({...adminTmp, session: sessionTest._id},
            "refreshTokenPrivateKey",
            {expiresIn: "-10m"});

        const {statusCode} = await supertest(app).get("/api/sessions").set({
            "Authorization": `Bearer ${accessTokenExpired}`,
            "Content-Type": "application/json",
            "x-refresh": refreshTokenExpired,
        });
        expect(statusCode).toBe(403);
    })


    test(`updateAnnouncemntHandler Test`, async () => {
        // call set anouncemnt service
        await updateOrCreateAnnouncements([
            {
                title: 'Awesome work everyone!',
                text: 'What a fine product! Such WOW! Much 1,0!!',
                author: 'bach.jannik@web.de',
                timeout: 1645137628851,
                timeOfAddition: 1643927628851,
            }
        ])

        // test if it was written successfully
        const getResponse = await supertest(app).get("/announcements");
        expect(getResponse.statusCode).toBe(200);
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
        expect(getResponse.body).toEqual(expectedAnnouncementData);
    });

});