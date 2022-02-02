import {ColorScheme} from "../values/ColorScheme";
import {FontSize} from "../values/FontSize";
import {DesignConfigPersistence} from "./DesignConfigPersistence";
import {DesignValuesPersistence} from "./DesignValuesPersistence";

export interface DesignConfigValues {
    fontSize: FontSize;
    colorScheme: ColorScheme;
    background: string;
}

/**
 * A utility class that combines the two tasks of first getting the
 * IDs of the selected design options and then actually getting the
 * corresponding values.
 */
export class DesignUtility {

    private static designValuesPersistence = new DesignValuesPersistence();
    private static designConfigPersistence = new DesignConfigPersistence();

    static getDesignConfigValues(): Promise<DesignConfigValues> {
        return this.designConfigPersistence.getConfigData()
            .then(configData => this.designValuesPersistence.getValuesData().then(valuesData => {
                const colorScheme = valuesData.colorSchemes.find(c => c.id === configData.colorScheme);
                return {
                    fontSize: valuesData.fontSizes.find(fontSize => fontSize.id === configData.fontSize),
                    colorScheme: colorScheme,
                    background: configData.background,
                };
            }));
    }
}