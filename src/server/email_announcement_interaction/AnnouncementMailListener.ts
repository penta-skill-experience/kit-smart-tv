import * as EmailConfig from "./MailAccontConfig.json";
import * as EmailInteractionConfig from "./MailInteractionConfig.json"
import {MailListener} from "mail-listener-typescript";
import {EmailAnnouncementExecutor} from "./EmailAnnouncementExecutor";
import * as fs from "fs";

/**
 * A class to create a mail listener to listen for announcements.
 */
export class AnnouncementMailListener {

    private mailListener : MailListener

    /**
     * Creates the mail listener using the options supplied from MailAccountConfig.json.
     */
    createMailListener() {
        const options = { // see https://www.npmjs.com/package/mail-listener-typescript
            username: EmailConfig.USERNAME,
            password: EmailConfig.PASSWORD,
            host:  EmailConfig.HOST,
            port:  EmailConfig.PORT,
            tls:  EmailConfig.TLS,
            connTimeout: EmailConfig.CONN_TIMEOUT,
            authTimeout:  EmailConfig.AUTH_TIMEOUT,
            debug: EmailConfig.DEBUG,
            tlsOptions: { rejectUnauthorized: EmailConfig.TLS_OPTIONS.REJECT_UNAUTHORIZED },
            mailbox: EmailConfig.MAILBOX,
            searchFilter: EmailConfig.SEARCH_FILTER,
            markSeen: EmailConfig.MARK_SEEN,
            fetchUnreadOnStart: EmailConfig.FETCH_UNREAD_ON_START,
            mailParserOptions: { streamAttachments: EmailConfig.MAIL_PARSER_OPTIONS.STREAM_ATTACHMENTS },
            attachments: EmailConfig.ATTACHMENTS,
            attachmentOptions: {
                saveAttachments: EmailConfig.ATTACHMENT_OPTIONS.SAVE_ATTACHMENTS,
                directory: EmailConfig.ATTACHMENT_OPTIONS.DIRECTORY,
                stream: EmailConfig.ATTACHMENT_OPTIONS.STREAM,
            },
        };

        this.mailListener = new MailListener(options);

        this.mailListener.start();

        this.mailListener.on("mail", async mail => {
            new EmailAnnouncementExecutor().executeEmailCommand(mail);
        });

        this.mailListener.on("error", async error => {
            fs.writeFileSync(EmailInteractionConfig.MAIL_LISTENER_ERROR_FILE_NAME, error);
        });
    }

    /**
     * Stops and disconnects a created listener.
     */
    stopMailListener() {
        this.mailListener.stop();
    }
}