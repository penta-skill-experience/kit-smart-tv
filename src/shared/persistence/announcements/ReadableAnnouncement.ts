import {Announcement} from "../../../server/announcement_management/Announcement";

export class ReadableAnnouncement {
    public title: string;
    public author: string
    public timeOfAddition: string;
    public timeout: string;
    public text: string;

    public constructor(ann: Announcement) {
        this.title = ann.title;
        this.author = ann.author;
        this.text = ann.text;
        this.timeOfAddition = ann.timeOfAddition.toString();
        this.timeout = ann.timeout.toString();
    }
}