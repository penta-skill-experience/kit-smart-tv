import * as React from "react";
import {Announcement} from "../../../server/announcement_management/Announcement";
import {AnnouncementPersistence} from "../../../shared/persistence/AnnouncementPersistence";
import * as AnnouncementConfig from "./AnnouncementComponent.json"

interface AnnouncementState {
    announcements : Announcement[];
}

export class AnnouncementComponent extends React.Component<{}, AnnouncementState> {

    constructor(props) {
        super(props);
        this.state = {
            announcements: []
        };
    }

    async tick() {
        let currentAnnouncements : Announcement[];
        await new AnnouncementPersistence().getAnnouncements().then(data => currentAnnouncements = data);
        this.setState({
            announcements: currentAnnouncements
        });
    }

    async componentWillMount() {
        await this.tick();
    }

    ComponentDidMount() {
        setInterval(() => this.tick(), AnnouncementConfig.REFRESH_RATE);
    }
}