import * as React from "react";
import {AdminStatePersistence} from "../../../shared/persistence/AdminStatePersistence";
import {Button} from "@mui/material";
import {TokenHolderSingleton} from "../../../shared/persistence/TokenHolderSingleton";
import {AnnouncementPersistence} from "../../../shared/persistence/AnnouncementPersistence";

interface RssFeedDisplayProps {
    url: string;
}

export class RssFeedDisplayComponent extends React.Component<RssFeedDisplayProps, any> {

    render() {
        return <div>
            url: {this.props.url}
        </div>;
    }
}