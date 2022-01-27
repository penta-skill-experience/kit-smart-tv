import * as React from "react";
import {Announcement} from "../../../server/announcement_management/Announcement";
import {AnnouncementPersistence} from "../../../shared/persistence/AnnouncementPersistence";
import * as AnnouncementConfig from "./AnnouncementComponent.json"
import {VerifiedUser} from "../../../shared/values/VerifiedUser";

interface AnnouncementState {
    announcements: Announcement[];
    verifiedUsers: VerifiedUser[]
}

export class AnnouncementComponent extends React.Component<{}, AnnouncementState> {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            verifiedUsers: []
        };
    }

    async tick() {
        let currentAnnouncements: Announcement[];
        await new AnnouncementPersistence().getAnnouncements().then(data => currentAnnouncements = data);
        let currentVerifiedUsers: VerifiedUser[];
        await new AnnouncementPersistence().getVerifiedUsers().then(data => currentVerifiedUsers = data);
        this.setState({
            announcements: currentAnnouncements,
            verifiedUsers: currentVerifiedUsers
        });
    }

    async componentWillMount() {
        await this.tick();
    }

    ComponentDidMount() {
        setInterval(() => this.tick(), AnnouncementConfig.REFRESH_RATE);
    }

    render() {
        const sortedAnnouncements = this.state.announcements.sort((ann1, ann2) => {
            return ann1.timeOfAddition < ann2.timeOfAddition ? 1 : -1; // sort, so newest are at the front
        })
        if(!(sortedAnnouncements.length > 0)) {
            return "";
        }
        return <div className="grid grid-flow-row">
            {
                sortedAnnouncements.slice(0, AnnouncementConfig.DISPLAYED_ANNOUNCEMENTS + 1).map(announcement =>
                    <div className = "font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                    <b>{announcement.title} - {this.getAuthorForAnnouncement(announcement)} </b><br/>
                        {announcement.text} <br/><br/>
                    </div>
                )
            }

        </div>
    }

    private getAuthorForAnnouncement(announcement: Announcement): string {
        for (let verifiedUser of this.state.verifiedUsers) {
            if (verifiedUser.email === announcement.author) {
                return verifiedUser.name;
            }
        }
        return announcement.author;
    }
}