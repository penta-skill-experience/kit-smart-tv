import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {WidgetConfigPage} from "./WidgetConfigPage";

export function RSSFeedConfigPage() {

    return(WidgetConfigPage({content:RSSFeedConfigDialogComponent()}));
}

function RSSFeedConfigDialogComponent() {
    const [RSSFeed, setRSSFeed] = React.useState('');
    const handleRSSFeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRSSFeed(event.target.value);
    };

    return(
        <div>
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
                            value={RSSFeed}
                            onChange={handleRSSFeedChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined">
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </div>
    );
}
