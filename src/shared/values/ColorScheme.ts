import {Background} from "./Background";

export class ColorScheme {

    id: string;
    name: string;
    titleFontColor: string;
    bodyFontColor: string;
    specialBoldFontColor: string;
    specialSubtleFontColor: string;
    accentBarColor: string;
    backgroundImages: Background[];

    constructor(id: string, name: string, titleFontColor: string, bodyFontColor: string, specialBoldFontColor: string, specialSubtleFontColor: string, accentBarColor: string, backgroundImages: Background[]) {
        this.id = id;
        this.name = name;
        this.titleFontColor = titleFontColor;
        this.bodyFontColor = bodyFontColor;
        this.specialBoldFontColor = specialBoldFontColor;
        this.specialSubtleFontColor = specialSubtleFontColor;
        this.accentBarColor = accentBarColor;
        this.backgroundImages = backgroundImages;
    }
}