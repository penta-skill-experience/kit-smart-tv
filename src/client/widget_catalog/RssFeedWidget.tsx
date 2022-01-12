import {Widget} from "../widget/Widget";
import {WidgetConfigSaver} from "../widget/WidgetConfigSaver";
import * as React from "react";
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

    createConfigComponent(rawConfig: JSON, saver: WidgetConfigSaver): JSX.Element {
        const config = new RssFeedConfig();
        config.load(rawConfig);

        return <RssFeedConfigComponent
            url={config.url}
            save={() => saver.save(config.save())}
        />;
    }

    getTitle(): string {
        return "RSS Feed";
    }

    isConfigurable(): boolean {
        return false;
    }

}