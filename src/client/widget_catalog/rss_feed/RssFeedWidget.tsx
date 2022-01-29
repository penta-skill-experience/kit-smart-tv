import * as React from "react";
import {Widget} from "../../widget/Widget";
import {RssFeedDisplayComponent} from "./RssFeedDisplayComponent";
import {RssFeedConfigComponent} from "./RssFeedConfigComponent";
import {ConfigComponent} from "../../widget/ConfigComponent";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class RssFeedWidget implements Widget {

    getDisplayComponentClass(): typeof DisplayComponent {
        return RssFeedDisplayComponent;
    }

    getConfigComponentClass(): typeof ConfigComponent {
        return RssFeedConfigComponent;
    }

    getTitle(): string {
        return "RSS Feed";
    }

    isConfigurable(): boolean {
        return true;
    }

    getDefaultRawConfig(): Object {
        return {
            url: "",
        }
    }
}