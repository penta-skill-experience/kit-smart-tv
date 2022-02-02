/**
 * Objects of this interface represent announcements.
 */
export interface Announcement {

    /**
     * An announcement is identified by its title.
     */
    title: string;

    /**
     * The author of an announcement must be an e-mail address.
     */
    author: string;
    text: string;

    /**
     * unix timestamp of the time, when the announcement was added to the system.
     */
    timeOfAddition: number;

    /**
     * unix timestamp of the time, when the timeout of the announcement occurs.
     */
    timeout: number;
}