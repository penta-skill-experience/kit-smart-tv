export class FontSize {
    id: string;
    name: string;
    titleFontSize: number;
    bodyFontSize: number;
    specialFontSize: number;
    specialFontSizeAccents: number;

    constructor(id: string, name: string, titleFontSize: number, bodyFontSize: number, specialFontSize: number, specialFontSizeAccents: number) {
        this.id = id;
        this.name = name;
        this.titleFontSize = titleFontSize;
        this.bodyFontSize = bodyFontSize;
        this.specialFontSize = specialFontSize;
        this.specialFontSizeAccents = specialFontSizeAccents;
    }
}