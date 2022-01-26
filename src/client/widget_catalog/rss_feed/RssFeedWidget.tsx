import * as React from "react";
import {Widget} from "../../widget/Widget";
import {WidgetConfigSaver} from "../../widget/WidgetConfigSaver";
import {RssFeedDisplayComponent} from "./RssFeedDisplayComponent";
import {RssFeedConfig} from "./RssFeedConfig";
import {RssFeedConfigComponent} from "./RssFeedConfigComponent";

export class RssFeedWidget implements Widget {

    createDisplayComponent(rawConfig: JSON): JSX.Element {
        const config = new RssFeedConfig();
        config.load(rawConfig);

        return <RssFeedDisplayComponent
            url={config.url}
        />;
    }

    createConfigComponent(rawConfig: Object, save: (rawConfig: Object) => void): JSX.Element {
        const config = new RssFeedConfig();
        config.load(rawConfig);

        return <RssFeedConfigComponent
            url={config.url}
            save={save}
        />;
    }

    getTitle(): string {
        return "RSS Feed";
    }

    isConfigurable(): boolean {
        return true;
    }

    getDefaultRawConfig(): Object {
        const config = new RssFeedConfig();
        return config.save();
    }
}