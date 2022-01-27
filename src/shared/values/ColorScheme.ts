import {Background} from "./Background";

export interface ColorScheme {
    id: string;
    name: string;
    titleFontColor: string;
    bodyFontColor: string;
    specialBoldFontColor: string;
    specialSubtleFontColor: string;
    accentBarColor: string;
    backgroundImages: Background[];
}