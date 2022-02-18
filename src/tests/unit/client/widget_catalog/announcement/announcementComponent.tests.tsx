import React from "react";
import renderer from 'react-test-renderer';
import {VerifiedUser} from "../../../../../shared/values/VerifiedUser";
import {newAnnouncement} from "../../../server/util/newAnnouncement";
import {
    AnnouncementPersistenceBackend
} from "../../../../../shared/persistence/announcements/AnnouncementPersistenceBackend";
import {Announcement} from "../../../../../shared/values/Announcement";
import {AnnouncementComponent} from "../../../../../client/widget_catalog/announcement/AnnouncementComponent";

// setting up test values
const bob = new VerifiedUser("bob@example.com", "bob");
const alice = new VerifiedUser("alice@example.com", "alice");
const verifiedUsers = [bob, alice];

const bobAnnouncement = newAnnouncement("Bobs Announcement", bob.email, "This is bobs announcement.");
const aliceAnnouncement = newAnnouncement(
    "Announcement from alice", alice.email, "This announcement is from alice");
const announcements = [bobAnnouncement, aliceAnnouncement];

//mocking announcementPersistence to return test values for these tests
const getAnnouncementsMock = jest.spyOn(AnnouncementPersistenceBackend.prototype, "getAnnouncements");
const getVerifiedUsersMock = jest.spyOn(AnnouncementPersistenceBackend.prototype, "getVerifiedUsers");

getAnnouncementsMock.mockImplementation(() => {
    return new Promise<Announcement[]>(resolve => {
        resolve(announcements);
    });
});
getVerifiedUsersMock.mockImplementation(() => {
    return new Promise<VerifiedUser[]>(resolve => {
        resolve(verifiedUsers);
    });
});

test("announcementComponent Snapshot", () => {
    const tree = renderer
        .create(<AnnouncementComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"} />)
            .toJSON();
    expect(tree).toMatchSnapshot();
});

afterAll(() => {
    jest.restoreAllMocks();
})