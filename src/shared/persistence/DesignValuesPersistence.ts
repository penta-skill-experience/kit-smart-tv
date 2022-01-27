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
                    "limeGreen",
                    "white",
                    "",
                    "",
                    "rgba(48, 48, 48, .45)",
                    [new Background("image", "https://images.wallpaperscraft.com/image/single/city_skyscrapers_clouds_rain_road_cars_lights_58563_3840x2160.jpg")]
                ),
                "light": new ColorScheme(
                    "light",
                    "Light",
                    "royalBlue",
                    "black",
                    "",
                    "",
                    "rgba(240, 240, 240, .6)",
                    [new Background("image", "https://images.wallpapersden.com/image/download/new-york-city-buildings-at-day-sunlight_am5samuUmZqaraWkpJRobWllrWdma2U.jpg")]
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
                "small": new FontSize("small", "Small", 0.8),
                "medium": new FontSize("medium", "Medium", 1),
                "large": new FontSize("large", "Large", 1.2),
            };
            const data = mockDatabaseColorSchemes[id];
            resolve(data);
        });
    }
}