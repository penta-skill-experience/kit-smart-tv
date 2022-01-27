import * as React from "react";
import {AdminStatePersistence} from "../../../shared/persistence/AdminStatePersistence";
import {Button} from "@mui/material";
import {TokenHolderSingleton} from "../../../shared/persistence/TokenHolderSingleton";
import {AnnouncementPersistence} from "../../../shared/persistence/AnnouncementPersistence";
import {Announcement} from "../../../server/announcement_management/Announcement";

interface RssFeedDisplayProps {
    url: string;
}

export class RssFeedDisplayComponent extends React.Component<RssFeedDisplayProps, any> {

    render() {
        return <div>
            (RSS Feed Content)           (RSS Feed Content)
            <Button onClick={() => {
                const adminstate = new AdminStatePersistence();
                adminstate.login("Password456!").then().catch();
            }}>login</Button>
            <Button onClick={() => {
                const adminstate = new AdminStatePersistence();
                adminstate.login("Password654!").then().catch();
            }}>alt_login</Button>
            <Button onClick={() => {
                const adminstate = new AdminStatePersistence();
                adminstate.getAdminLoginState().then();
            }}>beat</Button>
            <Button onClick={() => {
                const adminstate = new AdminStatePersistence();
                adminstate.setPassword("Password456!", "Password654!").then();
            }}>passwordchange1</Button>
            <Button onClick={() => {
                const adminstate = new AdminStatePersistence();
                adminstate.setPassword("Password654!", "Password456!").then();
            }}>passwordchange2</Button>
            <Button onClick={() => {
                const adminstate = new AdminStatePersistence();
                adminstate.logout().then(() => console.log(TokenHolderSingleton.instance.accessToken));
            }}>logout</Button>
            <Button onClick={() => {
                const ann = new AnnouncementPersistence();
                ann.getAnnouncements().then(r => console.log(r)).catch();
            }}>getAnnouncements</Button>

            <Button onClick={() => {
                const ann = new AnnouncementPersistence();
                ann.setAnnouncements([new Announcement("Bobs Announcement", "bob@example.com", "This is bobs announcement."), new Announcement("Alices Announcement", "alice@example.com", "This is alice announcement.")]).then(r => console.log(r)).catch();
            }}>setAnnouncements</Button>
        </div>;
    }
}