import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import {ConfigComponent, ConfigComponentProps} from "../../widget/ConfigComponent";

interface RssFeedConfigState {
    urlText: string;
}

export class RssFeedConfigComponent extends ConfigComponent<RssFeedConfigState> {

    constructor(props: Readonly<ConfigComponentProps> | ConfigComponentProps) {
        super(props);

        const url = this.props.config["url"];

        this.state = {
            urlText: url,
        };
    }

    save(): Object {
        return {
            url: this.state.urlText,
        };
    }

    render() {
        return <div>
            <DialogTitle>RSS Feed Settings</DialogTitle>
            <DialogContent>
                <br/>
                <TextField
                    label={"RSS Feed URL"}
                    value={this.state.urlText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            urlText: event.target.value,
                        });
                    }}
                />
            </DialogContent>
        </div>;
    }
}