import * as React from "react";
import {Button} from "@mui/material";
import {WidgetPersistence} from "../../../shared/persistence/WidgetPersistence";

interface RssFeedDisplayProps {
    url: string;
}

export class RssFeedDisplayComponent extends React.Component<RssFeedDisplayProps, any> {

    private widgetPersistence = new WidgetPersistence();

    render() {
        return <div>
            <Button title={"yeet to db"} onClick={() => this.widgetPersistence.setWidgetDataList([{
                widgetId: "rss-feed",
                rawConfig: {url: "www.example.com"},
                location: 5,
            }])} />
        </div>;
    }
}