import { IMailObject } from "mail-listener-typescript";
import {IMailAttachment} from "mail-listener-typescript/dist/types/config";
import {EmailAnnouncementParser} from "../../../../server/email_announcement_interaction/EmailAnnouncementParser";
import {AnnouncementAuthorError} from "../../../../server/announcement_management/AnnouncementAuthorError";

const mail1Subject = "HelloWorld";
const mail1address = "bob@example.com";
const mail1text = "What a wonderful world."

// unnecessary entries are initialized with [] or ""
const mail1 : IMailObject = {
    headers: [],
    subject: mail1Subject,
    from: {
        value: [{
            address: mail1address,
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
    text: mail1text,
    textAsHtml: "",
    attachments: []
}

const mail2Subject = "Another test";
const mail2addressInvalidEmail = "alice.smithgmail.com"; // although this isn't possible
const mail2text = "Greetings from alice smith."

const mail2 : IMailObject = {
    headers: [],
    subject: mail2Subject,
    from: {
        value: [{
            address: mail2addressInvalidEmail,
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
    text: mail2text,
    textAsHtml: "",
    attachments: []
}

describe("testing EmailAnnouncementParser parses mails correctly", () => {

    test("testing EmailAnnouncementParser parses mail1 correctly", () => {
        const parsedAnnouncement = new EmailAnnouncementParser(mail1).parseToAnnouncement();
        expect(parsedAnnouncement.title).toEqual(mail1Subject);
        expect(parsedAnnouncement.author).toEqual(mail1address);
        expect(parsedAnnouncement.text).toEqual(mail1text);
    });

    test("testing EmailAnnouncementParser throws exception for mail2 because of invalid author", () => {
        expect(() => {
            new EmailAnnouncementParser(mail2).parseToAnnouncement();
        }).toThrow(AnnouncementAuthorError);
    });
});

