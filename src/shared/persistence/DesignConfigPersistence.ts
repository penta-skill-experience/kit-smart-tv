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
        return this.getConfigData()
            .then(configData => {
                const configToSet = configData;
                configToSet.colorScheme = id;
                return this.setConfigData(configToSet)
            })
    }

    setSelectedBackground(id: string) {
        return this.getConfigData()
            .then(configData => {
                const configToSet = configData;
                configToSet.background = id;
                return this.setConfigData(configToSet)
            });
    }

    setSelectedFontSize(id: string) {
        return this.getConfigData()
            .then(configData => {
                const configToSet = configData;
                configToSet.fontSize = id;
                return this.setConfigData(configToSet)
            });
    }

    /* Queries the whole config object.
       Other getters cherry-pick from this object for utility.
     */
    getConfigData(): Promise<ConfigData> {
        return fetch(`${config.DOMAIN}/config`)
            .then((value: Response) => value.json());
    }

    setConfigData(configData : ConfigData) {

        const headers = new Headers();
        headers.append("x-refresh", sessionStorage.getItem('refreshToken'));
        headers.append("Authorization", `Bearer ${sessionStorage.getItem("accessToken")}`);
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(configData),
        };

        return new Promise<void>((resolve, reject) => {
            fetch(`${config.DOMAIN}/config`, requestOptions)
                .then(response => {
                    const new_accessToken = response.headers.get('x-access-token');
                    if (new_accessToken) {
                        //if a new accessToken is provided, update it.
                        sessionStorage.setItem("accessToken", new_accessToken);
                    }

                    if (response.status === 200) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => reject());
        })
    }
}