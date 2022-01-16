import {ColorScheme} from "../values/ColorScheme";
import {Background} from "../values/Background";
import {FontSize} from "../values/FontSize";

export class DesignValuesPersistence {

    getColorSchemeTypes(): string[] {
        //todo
        return [];
    }

    getColorScheme(id: string): ColorScheme {
        //todo
        return new ColorScheme(
            "mycolorschemeid",
            "Some Color Scheme",
            "#00FF80",
            "black",
            "rgba(255, 0, 255, 1)",
            "#ff0",
            "red",
            [new Background("asdf", "someimage.png")]
        );
    }

    setColorSchemes(list: ColorScheme[]) {
        //todo
    }

    getBackground(id: string): Background {
        //todo
        return new Background(id, "someimage.png");
    }

    getBackgrounds(colorSchemeId: string): string[] {
        //todo
        return [];
    }

    setBackgrounds(list: string[]) {
        //todo
    }

    getFontSizeTypes(): string[] {
        //todo
        return [];
    }

    //todo: do we need this method? What is FontSizeTypes?
    // setFontSizeTypes(list: FontSizeTypes[]) {
    //     //todo
    // }

    getFontSize(id: string): FontSize {
        //todo
        return new FontSize(id, "myfontsize", 24, 12, 10, 8);
    }
}