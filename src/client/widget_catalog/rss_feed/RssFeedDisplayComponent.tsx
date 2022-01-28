import * as React from "react";
import {DisplayComponent} from "../../widget/DisplayComponent";
import {AnnouncementPersistence} from "../../../shared/persistence/AnnouncementPersistence";
import {Button} from "@mui/material";

export class RssFeedDisplayComponent extends DisplayComponent<any> {
    render() {
        return <Button onClick={() => {
            const ann = new AnnouncementPersistence;
            ann.getVerifiedUsers().then(o => console.log(o));
        }
        }>getAnnouncements</Button>
    }
}