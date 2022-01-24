import {ColorScheme} from "../values/ColorScheme";
import {Background} from "../values/Background";
import {FontSize} from "../values/FontSize";

export class DesignValuesPersistence {

    getColorSchemeTypes(): Promise<string[]> {
        //todo: this is just a mock
        return new Promise<string[]>(resolve => {
            const data = ["dark", "light"];
            resolve(data);
        });
    }

    getColorScheme(id: string): Promise<ColorScheme> {
        //todo: this is just a mock
        return new Promise<ColorScheme>(resolve => {
            const mockDatabaseColorSchemes = {
                "dark": new ColorScheme(
                    "dark",
                    "Dark",
                    "#00FF80",
                    "white",
                    "rgba(255, 0, 255, 1)",
                    "#ff0",
                    "red",
                    [new Background("asdf", "someimage.png")]
                ),
                "light": new ColorScheme(
                    "light",
                    "Light",
                    "#00FF80",
                    "black",
                    "rgba(255, 100, 255, 1)",
                    "#ffa",
                    "red",
                    [new Background("asdf", "someimage.png")]
                ),
            };
            const data = mockDatabaseColorSchemes[id];
            resolve(data);
        });
    }

    setColorSchemes(list: ColorScheme[]) {
        //todo
    }

    getBackground(id: string): Background {
        //todo: this is just a mock
        return new Background(id, "someimage.png");
    }

    getBackgrounds(colorSchemeId: string): string[] {
        //todo
        return [];
    }

    setBackgrounds(list: string[]) {
        //todo
    }

    getFontSizes(): Promise<string[]> {
        //todo: this is just a mock
        return new Promise<string[]>(resolve => resolve(["small", "medium", "large"]));
    }

    //todo: do we need this method?
    setFontSizes(list: FontSize[]) {
        //todo
    }

    getFontSize(id: string): Promise<FontSize> {
        //todo: this is just a mock
        return new Promise<FontSize>(resolve => {
            const mockDatabaseColorSchemes = {
                "small": new FontSize("small", "Small", 16, 10, 8, 8),
                "medium": new FontSize("medium", "Medium", 24, 12, 10, 10),
                "large": new FontSize("large", "Large", 32, 14, 12, 12),
            };
            const data = mockDatabaseColorSchemes[id];
            resolve(data);
        });
    }
}