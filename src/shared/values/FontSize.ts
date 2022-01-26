export class FontSize {
    id: string;
    name: string;
    relativeSize: number;

    constructor(id: string, name: string, relativeSize: number) {
        this.id = id;
        this.name = name;
        this.relativeSize = relativeSize;
    }
}