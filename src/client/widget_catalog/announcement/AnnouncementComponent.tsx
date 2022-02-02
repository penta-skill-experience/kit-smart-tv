import * as React from "react";
import {Announcement} from "../../../server/announcement_management/Announcement";
import {AnnouncementPersistence} from "../../../shared/persistence/announcements/AnnouncementPersistence";
import * as AnnouncementConfig from "./AnnouncementComponent.json"
import {VerifiedUser} from "../../../shared/values/VerifiedUser";
import {DisplayComponent} from "../../widget/DisplayComponent";

interface AnnouncementState {
    announcements: Announcement[];
    verifiedUsers: VerifiedUser[]
}

export class AnnouncementComponent extends DisplayComponent<AnnouncementState> {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            verifiedUsers: []
        };
    }

    async tick() {
        const currentAnnouncements = await AnnouncementPersistence.getInstance().getAnnouncements();
        const currentVerifiedUsers = await AnnouncementPersistence.getInstance().getVerifiedUsers();


        currentAnnouncements.sort((ann1, ann2) => {
            return ann1.timeOfAddition < ann2.timeOfAddition ? 1 : -1; // sort, so newest are at the front
        });


        this.setState({
            announcements: currentAnnouncements,
            verifiedUsers: currentVerifiedUsers
        });
    }

    async componentWillMount() {
        await this.tick();
    }

    componentDidMount() {
        setInterval(() => this.tick(), AnnouncementConfig.REFRESH_RATE);
    }

    render() {
        if (this.state.announcements.isEmpty) {
            return;
        }

        return <div className="grid grid-flow-row">
            {
                //sortedAnnouncements
                this.state.announcements.slice(0, AnnouncementConfig.DISPLAYED_ANNOUNCEMENTS + 1).map((announcement, index) =>
                    <div key={index} className = "font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
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