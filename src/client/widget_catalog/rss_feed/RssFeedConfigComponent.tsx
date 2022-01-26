import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface RssFeedConfigProps {
    url: string;
    save: (rawConfig: Object) => void;
}

interface RssFeedConfigState {
    urlText: string;
}

export class RssFeedConfigComponent extends React.Component<RssFeedConfigProps, RssFeedConfigState> {


    constructor(props: Readonly<RssFeedConfigProps> | RssFeedConfigProps) {
        super(props);
        this.state = {
            urlText: this.props.url,
        };
    }

    private saveConfig() {
        this.props.save({
            url: this.state.urlText,
        });
    }

    render() {
        return <div>
            <DialogTitle>RSS Feed Settings</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <h1>Current Source URL:</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>Change Source URL:</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={this.state.urlText}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({
                                urlText: event.target.value,
                            })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => this.saveConfig()}>
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </div>;
    }
}