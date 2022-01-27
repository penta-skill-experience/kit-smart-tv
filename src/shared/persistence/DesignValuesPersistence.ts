import {ColorScheme} from "../values/ColorScheme";
import {Background} from "../values/Background";
import {FontSize} from "../values/FontSize";
import config from "./persistence.config.json";
import {ValuesData} from "./data";

export class DesignValuesPersistence {

    getColorSchemeTypes(): Promise<string[]> {
        //todo: this is just a mock
        return new Promise<string[]>(resolve => {
            const data = ["dark", "light"];
            resolve(data);
        });
    }

    getColorScheme(id: string): Promise<ColorScheme> {

        return this.getValuesData().then(values => values.colorSchemes.find(colorScheme => colorScheme.id === id));

        //todo: this is just a mock
        // return new Promise<ColorScheme>(resolve => {
        //     const mockDatabaseColorSchemes: { [key: string]: ColorScheme } = {
        //         "dark": {
        //             id: "dark",
        //             name: "Dark",
        //             titleFontColor: "limeGreen",
        //             bodyFontColor: "white",
        //             specialBoldFontColor: "",
        //             specialSubtleFontColor: "",
        //             accentBarColor: "rgba(48, 48, 48, .45)",
        //             backgroundImages: [new Background("image", "https://images.wallpaperscraft.com/image/single/city_skyscrapers_clouds_rain_road_cars_lights_58563_3840x2160.jpg")]
        //         },
        //         "light": {
        //             id: "light",
        //             name: "Light",
        //             titleFontColor: "royalBlue",
        //             bodyFontColor: "black",
        //             specialBoldFontColor: "red",
        //             specialSubtleFontColor: "orange",
        //             accentBarColor: "rgba(240, 240, 240, .6)",
        //             backgroundImages: [new Background("image", "https://images.wallpapersden.com/image/download/new-york-city-buildings-at-day-sunlight_am5samuUmZqaraWkpJRobWllrWdma2U.jpg")]
        //         },
        //     };
        //     const data = mockDatabaseColorSchemes[id];
        //     resolve(data);
        // });
    }

    setColorSchemes(list: ColorScheme[]) {
        //todo
    }

    getBackground(id: string): Background {
        //todo: do we even need this?

        //todo: this is just a mock
        return {
            id: id,
            url: "someimage.png"
        };
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
        return this.getValuesData().then(values => values.fontSizes.find(fontSize => fontSize.id === id));

        //todo: this is just a mock
        // return new Promise<FontSize>(resolve => {
        //     const mockDatabaseColorSchemes = {
        //         "small": {id: "small", name: "Small", relativeSize: 0.8},
        //         "medium": {id: "medium", name: "Medium", relativeSize: 1},
        //         "large": {id: "large", name: "Large", relativeSize: 1.2},
        //     };
        //     const data = mockDatabaseColorSchemes[id];
        //     resolve(data);
        // });
    }

    /* Queries the whole values object.
       Other getters cherry-pick from this object for utility.
     */
    getValuesData(): Promise<ValuesData> {
        return fetch(`${config.DOMAIN}/values`)
            .then((value: Response) => value.json());
    }
}