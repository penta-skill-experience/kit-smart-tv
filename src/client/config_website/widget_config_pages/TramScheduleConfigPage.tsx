import * as React from "react";
import {Button, Grid} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import {WidgetConfigPage} from "./WidgetConfigPage";

export function TramScheduleConfigPage({selectedTramStop}) {

    return(WidgetConfigPage({content:TramScheduleConfigDialogComponent(selectedTramStop)}));
}

function TramScheduleConfigDialogComponent({selectedTramStop}) {
    return(
        <div>
            <DialogTitle>Tram Schedule Settings</DialogTitle>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <h1>Select Tram Stop</h1>
                </Grid>
                <Grid item>
                    Current Selection: {selectedTramStop}
                </Grid>
                <Grid item>
                    Search for tram stop:
                </Grid>

            </Grid>
        </div>
    );
}