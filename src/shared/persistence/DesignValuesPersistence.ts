import {ColorScheme} from "../values/ColorScheme";
import {FontSize} from "../values/FontSize";
import config from "./persistence.config.json";
import {ValuesData} from "./data";

export class DesignValuesPersistence {

    getColorSchemeTypes(): Promise<ColorScheme[]> {
        return new Promise<ColorScheme[]>( (resolve)=>{
            this.getValuesData().then(values => resolve(values.colorSchemes));
        });

    }

    getColorScheme(id: string): Promise<ColorScheme> {
        return this.getValuesData().then(values => values.colorSchemes.find(colorScheme => colorScheme.id === id));
    }


    getFontSizes(): Promise<FontSize[]> {
        return new Promise<FontSize[]>( (resolve)=>{
            this.getValuesData().then(values => resolve(values.fontSizes))
        });
    }

    getFontSize(id: string): Promise<FontSize> {
        return this.getValuesData().then(values => values.fontSizes.find(fontSize => fontSize.id === id));
    }

    /* Queries the whole values object.
       Other getters cherry-pick from this object for utility.
     */
    getValuesData(): Promise<ValuesData> {
        return fetch(`${config.DOMAIN}/values`)
            .then((value: Response) => value.json());
    }
}