import {ConfigData} from "./data";
import config from "./persistence.config.json";

export class DesignConfigPersistence {

    getSelectedColorSchemeId(): Promise<string> {
        return this.getConfigData().then(configData => configData.colorScheme);
    }

    getSelectedBackground(): Promise<string> {
        return this.getConfigData().then(configData => configData.background);
    }

    getSelectedFontSizeId(): Promise<string> {
        return this.getConfigData().then(configData => configData.fontSize);
    }

    setSelectedColorSchemeId(id: string) {
        //todo
    }

    setSelectedBackground(id: string) {
        //todo
    }

    setSelectedFontSize(id: string) {
        //todo
    }

    /* Queries the whole config object.
       Other getters cherry-pick from this object for utility.
     */
    getConfigData(): Promise<ConfigData> {
        return fetch(`${config.DOMAIN}/config`)
            .then((value: Response) => value.json());
    }
}