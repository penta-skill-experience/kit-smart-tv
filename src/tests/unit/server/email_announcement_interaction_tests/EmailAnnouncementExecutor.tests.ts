import {SetAnnouncementCommand} from "../../../../server/announcement_management/SetAnnouncementCommand";
import {RemoveAnnouncementCommand} from "../../../../server/announcement_management/RemoveAnnouncementCommand";
import {IMailObject} from "mail-listener-typescript";
import {EmailAnnouncementExecutor} from "../../../../server/email_announcement_interaction/EmailAnnouncementExecutor";
import * as MailInteractionConfig from "../../../../server/email_announcement_interaction/MailInteractionConfig.json"

const textForSetCommand = "not an empty text";

const mailForSet : IMailObject = {
    headers: [],
    subject: "Hello World",
    from: {
        value: [{
            address: "bob@example.com",
            name: "",
        }],
        html: "",
        text: "",
    },
    to: [],
    date: "",
    messageId: "",
    inReplyTo: "",
    "reply-to": [],
    references: [],
    html: "",
    text: textForSetCommand,
    textAsHtml: "",
    attachments: []
}

const mailForRemove : IMailObject = {
    headers: [],
    subject: "Hello World",
    from: {
        value: [{
            address: "bob@example.com",
            name: "",
        }],
        html: "",
        text: "",
    },
    to: [],
    date: "",
    messageId: "",
    inReplyTo: "",
    "reply-to": [],
    references: [],
    html: "",
    text: MailInteractionConfig.REMOVE_ANNOUNCEMENT_TEXT,
    textAsHtml: "",
    attachments: []
}

describe("testing EmailAnnouncementExecutor calls Commands correctly", () => {
    let setCommandMock : jest.SpyInstance;
    let removeCommandMock : jest.SpyInstance;

    beforeEach(() => {
        setCommandMock = jest.spyOn(SetAnnouncementCommand.prototype, "executeCommand");
        removeCommandMock = jest.spyOn(RemoveAnnouncementCommand.prototype, "executeCommand");
    });

    test("testing EmailAnnouncementExecutor calls SetAnnouncementCommand properly", () => {
        new EmailAnnouncementExecutor().executeEmailCommand(mailForSet);

        expect(setCommandMock).toHaveBeenCalledTimes(1);
    });

    test("testing EmailAnnouncementExecutor calls RemoveAnnouncementCommand properly", () => {
        new EmailAnnouncementExecutor().executeEmailCommand(mailForRemove);

        expect(removeCommandMock).toHaveBeenCalledTimes(1);
    });
})