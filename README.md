# kit-smart-tv

This is a server application hosting a dashboard with (to KIT ITEC) relevant information on localhost. The dashboard is meant to be dispalyed on big screens. People passing by the screen can read the information.

# System Requirements
The server has to run on a linux or darwin (macOS) system. (Windows is possible, but some widgets will not fetch the data correctly if the server is hosted on windows.)
You need either a locally running instance of mongoDB or a cloud based one.
To run the server you need "node" and "npm" installed on the machine.

# How To Run This Project Locally
Checkout the project using `git clone penta-skill-experience/kit-smart-tv`.

Navigate to the root directory of the project and run `npm install` once to install all dependencies.

You also need to add a file called `.env` in your project root directory.
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

Build the project:
```sh
npm run build
```
This generates a `dist` folder with executable JavaScript under the project root.

Start the server:
```sh
node ./dist/server/server.js
```
This will print a URL to the console under which the dashboard is hosted.

The dashboard is accessible via <https://localhost:1337>.

The admin interface is accessible via <https://localhost:1337/admin-interface>.

# Optional: Use Own MongoDB Instance

If you need your own MongoDB instance, you need to preset an admin before you can use the dashboard and the admin interface properly.
After running the server, use the following in the console to create a admin with your own password. This command will only succeed once.

```
curl --location --request POST 'https://localhost:1337/admin/create-admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": {{yourpassword}}
}'
```


# Announcement Admins

The announcement admins are specified in the field "ADMINS" in ./src/server/announcement_management/AnnouncementConfig.json-
To add an admin, add an entry with the e-mail address of the admin to this field.
To remove an admin, remove the corresponding entry from the field.

# Verified Users

Verified Users can interact with announcements. They are added and removed by an admin in the admin interface.

# Configuring the e-mail address for announcements

The e-mail address is configured in ./src/server/email_announcement_interaction/MailAccountConfig.json. with the password being entered in
the .env file with the key "ANNOUNCEMENT_EMAIL_ACCOUNT_PW".

This is an example for the MailAccountConfig.json:
```
{
  "USERNAME": "kit-smart-tv.testing@outlook.de",    This is the e-mail address the announcements must be sent to
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

Addidtionally, the text to remove an announcement can be altered in MailInteractionConfig.json

This is an example for the MailInteractionConfig.json:
```
{
    "REMOVE_ANNOUNCEMENT_TEXT": ""                  The text of an Announcement to signal, that this announcement should be removed.
}
```

# How to send announcements

To send an announcement, send an e-mail to the USERNAME specified in ./src/server/email_announcement_interaction/MailAccountConfig.json.
The subject of the e-mail becomes the title of the announcement.
The text of the e-mail becomes the text of the announcement.
If the announcement title already exists, see "How to change announcements".
This functionality is limited to Verified Users and the announcement admins.

# How to change announcements

To change an announcement, send an announcement with the same title as the announcement you wish to change.
The original text of the announcement gets deleted and is replaced with the text from the sent announcement.
This is only possible, if the sent announcement is from the same Verified User as the original announcement or if the sent announcemnt is from
an announcement admin.

# How to remove announcements

To remove an announcement, send an announcement with the same title as the announcement you wish to change. Additionally, the sent 
announcement must have an empty text.
The announcement gets deleted.
This is only possible, if the sent announcement is from the same Verified User as the original announcement or if the sent announcemnt is from
an announcement admin.

# RSSFeed Warning

!!!Only enter trusted rss feeds into an rss-feed widget!!!
The rss feed embeds foreign HTML. This is a potential security risk.

