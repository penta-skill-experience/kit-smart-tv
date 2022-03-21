import * as EmailConfig from "./MailAccountConfig.json";
import {MailListener} from "mail-listener-typescript";
import {EmailAnnouncementExecutor} from "./EmailAnnouncementExecutor";
import "dotenv/config"

/**
 * A class to create a mail listener to listen for announcements.
 */
export class AnnouncementMailListener {

    private mailListener: MailListener;

    /**
     * Creates the mail listener using the options supplied from MailAccountConfig.json.
     */
    createMailListener() {
        const options = {
            username: EmailConfig.USERNAME,
            password: process.env.ANNOUNCEMENT_EMAIL_ACCOUNT_PW,
            host:  EmailConfig.HOST,
            port:  EmailConfig.PORT,
            tls:  EmailConfig.TLS,
            connTimeout: EmailConfig.CONN_TIMEOUT,
            authTimeout:  EmailConfig.AUTH_TIMEOUT,
            debug: console.log,
            tlsOptions: { rejectUnauthorized: EmailConfig.TLS_OPTIONS.REJECT_UNAUTHORIZED },
            mailbox: EmailConfig.MAILBOX,
            searchFilter: ["NEW"],
            markSeen: true,
            fetchUnreadOnStart: EmailConfig.FETCH_UNREAD_ON_START,
            mailParserOptions: { streamAttachments: false },
            attachments: false,
            attachmentOptions: {
                saveAttachments: false,
                directory: "attachments/",
                stream: true,
            },
        };

        this.mailListener = new MailListener(options);

        this.mailListener.start();

        this.mailListener.on("mail", mail => {
            // catch errors here, otherwise the package "mail-listener-typescript" will cause the universe to collapse
            // (irreversibly ruptures the space-time continuum, see https://en.wikipedia.org/wiki/Gravitational_singularity for details)
            try {
                new EmailAnnouncementExecutor().executeEmailCommand(mail);
            } catch (e) {
                console.error(e.message);
            }
        });

        this.mailListener.on("error", async (error : any) =>  {
            this.stopMailListener();
            await new Promise(resolve => setTimeout(resolve, EmailConfig.ON_ERROR_TIME_TO_RECONNECTION_ATTEMPT));
            this.createMailListener();
        });
    }

    /**
     * Stops and disconnects a created listener.
     */
    stopMailListener() {
        this.mailListener.stop();
    }
}