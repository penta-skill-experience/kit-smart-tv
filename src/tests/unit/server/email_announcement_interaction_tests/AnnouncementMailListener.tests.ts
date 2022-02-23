import {MailListener} from "mail-listener-typescript";
import {AnnouncementMailListener} from "../../../../server/email_announcement_interaction/AnnouncementMailListener";

const startMock = jest.spyOn(MailListener.prototype, "start");
const stopMock = jest.spyOn(MailListener.prototype, "stop");
const mailListener = new AnnouncementMailListener();

beforeEach(() => {
    startMock.mockImplementation(() => {});
    stopMock.mockImplementation(() =>{});
})

afterEach(() => {
    jest.clearAllMocks();
});

describe("mail listener tests", () => {

    test("mail listener calls start and stop", () => {
        mailListener.createMailListener();
        expect(startMock).toHaveBeenCalledTimes(1);
    });

    test("mail listener calls stop for stop", () => {
        mailListener.stopMailListener();
        expect(stopMock).toHaveBeenCalledTimes(1);
    });
});