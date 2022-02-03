# kit-smart-tv

This is a server application hosting a dashboard with (to KIT ITEC) relevant information on localhost. The dashboard is meant to be dispalyed on big screens. People passing by the screen should read the information while passign by.

# Server Requirements
The host server has to be a linux or darwin system. (Windows is possible but some widgets will not fetch the data correctly, if the server is hosted on windows)
You need either a locally running instance of mongoDB or a cloud based one.
To run the server you need "node" and "npm" installed on the machine.



# Git Install
you need git installed to do this.
Open a console and navigate to the directory you want to store the project. Then clone this project.
`git clone penta-skill-experience/kit-smart-tv`


To set the non public configuration of the project you need a file called `.env` in your project root directory.
This file must contain the following parameters in the respective `.env` notation

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


After cloning the project and adding `.env` you need to install the used packages. Therefore type in the console in the root directory of the project.
`npm install`

To build the server type in next.
`npm run build`

After the build is finished use `node ./dist/server/server.js`to run the server


# Call Dashboard
The dashboard is accessable via `https://localhost:1337`

# Call Settings
The admin interface fr configuration is acessable via `https://localhost:1337/admin-interface`

# Use own MongoDB instance

If you need your own MongoDB instance, you need to preset an admin before you can use the dashboard and the admin interface properly.
use the following in the console to create a admin with your own password

```
curl --location --request POST 'https://localhost:1337/admin/create-admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": {{yourpassword}}
}'
```


#How to send announcements



