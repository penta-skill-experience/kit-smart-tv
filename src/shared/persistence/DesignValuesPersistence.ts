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
                    "rgba(48, 48, 48, .6)",
                    [new Background("image", "https://images.wallpaperscraft.com/image/single/city_skyscrapers_clouds_rain_road_cars_lights_58563_3840x2160.jpg")]
                ),
                "light": new ColorScheme(
                    "light",
                    "Light",
                    "text-green-600",
                    "black",
                    "rgba(255, 100, 255, 1)",
                    "#ffa",
                    "bg-neutral-100",
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