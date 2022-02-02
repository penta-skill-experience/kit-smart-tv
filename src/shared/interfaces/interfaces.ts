import {FontSize} from "../values/FontSize";
import {ColorScheme} from "../values/ColorScheme";
import {Announcement} from "../values/Announcement";

/**
 * This file describes the structure of the objects that are returned by and passed to the database.
 */

export interface ValuesData {
    fontSizes: FontSize[];
    colorSchemes: ColorScheme[];
}

export interface ConfigData {
    fontSize: string;
    colorScheme: string;
    background: string;
}

export interface WidgetDataData {
    widgetDataList: {
        widgetId: string;
        location: number;
        rawConfig?: Object;
    }[];
}

export interface AnnouncementsData {
    announcementDataList: Announcement[];
}