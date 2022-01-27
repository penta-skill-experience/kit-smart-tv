import {Background} from "../values/Background";
import {ColorScheme} from "../values/ColorScheme";
import {FontSize} from "../values/FontSize";
import {DesignConfigPersistence} from "./DesignConfigPersistence";
import {DesignValuesPersistence} from "./DesignValuesPersistence";

export interface DesignConfigValues {
    fontSize: FontSize;
    colorScheme: ColorScheme;
    background: Background;
}

export class DesignUtility {

    private static designValuesPersistence = new DesignValuesPersistence();
    private static designConfigPersistence = new DesignConfigPersistence();

    static  getDesignConfigValues(): Promise<DesignConfigValues> {
        return this.designConfigPersistence.getConfigData().then(configData => this.designValuesPersistence.getValuesData().then(valuesData => {
            const colorScheme = valuesData.colorSchemes.find(c => c.id === configData.colorScheme);
            return {
                fontSize: valuesData.fontSizes.find(fontSize => fontSize.id === configData.fontSize),
                colorScheme: colorScheme,
                background: colorScheme.backgroundImages.find(b => b.id === configData.background),
            };
        }));
    }
}