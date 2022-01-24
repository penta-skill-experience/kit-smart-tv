import {WidgetConfig} from "../WidgetConfig";

export class RssFeedConfig implements WidgetConfig {
    url: string;

    save(): Object {
        return {
            url: this.url,
        };
    }

    load(raw: Object) {
        if (raw.hasOwnProperty("url")) {
            this.url = raw["url"];
        } else {
            throw new Error(`could not load RSS feed config from raw data: ${raw}`);
        }
    }
}