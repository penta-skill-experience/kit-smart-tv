import createServer from "../../../../server/api/utils/server";
import supertest from "supertest";


const app = createServer();


describe("healthcheck", () => {
    describe("given the server is running", () => {
        it("should return a 200 status code", async () => {
            const { statusCode } = await supertest(app)
                .get("/healthcheck")
                .send();
            expect(statusCode).toBe(200);
        })
    })
})