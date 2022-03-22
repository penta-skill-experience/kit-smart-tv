# kit-smart-tv

This is a server application hosting a dashboard. The dashboard is meant to be dispalyed on big screens where people passing by can read the information.

# Server Deployment

Requirements:
1. The server has to run on a linux or darwin (macOS) system. (Windows is possible, but some widgets will not fetch the data correctly if the server is hosted on windows.)
2. `curl` must be installed on your machine.
3. NodeJS version 16 or higher must be installed on your machine.<br>
   Use `node --version` to check that your NodeJS version is 16 or higher. Version 8 will not work!
   On Ubuntu, higher versions of NodeJS cannot be installed with `apt-get`.
   Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to install NodeJS instead.
4. You need an instance of MongoDB. Either locally or cloud-based.<br>
   If you use a cloud-based instance of MongoDB, make sure that your machine is able to reach the required URL and port.
   For example, if you use [Atlas](https://www.mongodb.com/atlas/database), your machine [needs to be able to reach port 27017](https://docs.atlas.mongodb.com/troubleshoot-connection/#attempting-to-connect-to-a-database-deployment-from-behind-a-firewall).

Deployment:
1. Checkout the project:
   ```sh
   git clone penta-skill-experience/kit-smart-tv
   ```
2. Navigate to the root directory of the project and run `npm install` once to install all dependencies.
3. Make sure that the `DOMAIN` value in `src/shared/persistence/persistence.config.json` matches the IP address of your server.
   For example, if you want to access your server via `localhost`, use `https://localhost:1337`.
4. You also need to add a file called `.env` in your project root directory.
    This file must contain the following parameters:
    ```
    ACCESS_TOKEN_PUBLIC_KEY=""
    ACCESS_TOKEN_PRIVATE_KEY=""
    REFRESH_TOKEN_PRIVATE_KEY=""
    REFRESH_TOKEN_PUBLIC_KEY=""
    MONGO_URI=""
    ANNOUNCEMENT_EMAIL_ACCOUNT_PW=""
    HTTPS_KEY=""
    HTTPS_CERT=""
    ```
5. Build the project:
    ```sh
    npm run build
    ```
    This generates a `dist` folder with executable JavaScript under the project root.
6. Start the server:
    ```sh
    node ./dist/server/server.js
    ```
7. The dashboard is now accessible under your server's IP address with port `1337`, via HTTPS.
8. The default admin password is `admin`. Please change this immediately via the admin interface to a secure password.

# Announcements

## Announcement Admins

The announcement admins are specified in the field `ADMINS` in ./src/server/announcement_management/AnnouncementConfig.json-
To add an admin, add an entry with the e-mail address of the admin to this field.
To remove an admin, remove the corresponding entry from the field.

## Verified Users

Verified Users can interact with announcements. They are added and removed by an admin in the admin interface.

## Configuring the e-mail address for announcements

The e-mail address is configured in ./src/server/email_announcement_interaction/MailAccountConfig.json. with the password being entered in
the .env file with the key "ANNOUNCEMENT_EMAIL_ACCOUNT_PW".

This is an example for the MailAccountConfig.json:
```
{
  "USERNAME": "ces-smart-tv@outlook.de",            This is the e-mail address the announcements must be sent to
  "HOST": "outlook.office365.com",                  The host of that e-mail address
  "PORT": 993,                                      The corresponding port
  "TLS": true,                                      Whether to use tls
  "CONN_TIMEOUT": 10000,                            the connection timeout
  "AUTH_TIMEOUT": 5000,                             the authentication timeout
  "TLS_OPTIONS": { "REJECT_UNAUTHORIZED": false },  whether to use the tls option "rejectUnauthorized"
  "MAILBOX": "INBOX",                               In which folder to look for new mails
  "FETCH_UNREAD_ON_START": true                     Whether to fetch all unread mails on startup
  "ON_ERROR_TIME_TO_RECONNECTION_ATTEMPT": 1000     The time interval to start a reconnection attempt if an error occured in ms
}
```

## How to send announcements

To send an announcement, send an e-mail to the USERNAME specified in ./src/server/email_announcement_interaction/MailAccountConfig.json.
The subject of the e-mail becomes the title of the announcement.
The text of the e-mail becomes the text of the announcement.
If the announcement title already exists, see "How to change announcements".
This functionality is limited to Verified Users and the announcement admins.

## How to change announcements

To change an announcement, send an announcement with the same title as the announcement you wish to change.
The original text of the announcement gets deleted and is replaced with the text from the sent announcement.
This is only possible, if the sent announcement is from the same Verified User as the original announcement or if the sent announcemnt is from
an announcement admin.

## How to remove announcements

To remove an announcement, send an announcement with the same title as the announcement you wish to change. Additionally, the sent 
announcement must have an empty text.
The announcement gets deleted.
This is only possible, if the sent announcement is from the same Verified User as the original announcement or if the sent announcemnt is from
an announcement admin.

# RSSFeed Warning

**Only enter trusted rss feeds into an rss-feed widget!**
The rss feed embeds foreign HTML. This is a potential security risk.

