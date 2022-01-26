// import {AdminStatePersistence} from "../../../../shared/persistence/AdminStatePersistence";
// import "isomorphic-fetch";
// import 'dotenv/config';
//
// let admin_state_persistence:AdminStatePersistence;
// beforeAll(async () => {
//     //await serverSetup(process.env.MONGO_URI_TESTING);
//     admin_state_persistence = new AdminStatePersistence();
// });
//
//
// describe("log in. heart beat. log out", () => {
//
//     test("log in and heart beat", async () => {
//         await admin_state_persistence.login("Password456!");
//         await admin_state_persistence.getAdminLoginState();
//     });
//
//     // test("log in, change password, log out, log in again", () => {
//     //     admin_state_persistence.login(process.env.ADMIN_PASSWORD)
//     //         .then(() => admin_state_persistence.setPassword(process.env.ADMIN_PASSWORD, process.env.ADMIN_PASSWORD_ALT)
//     //             .then(() => admin_state_persistence.logout()
//     //                 .then(() => admin_state_persistence.login(process.env.ADMIN_PASSWORD_ALT).then().catch(fail("didn't work")))));
//     // });
// });
//
//
//
