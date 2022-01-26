import * as React from "react";
import {Button, DialogContent, Grid} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import {WidgetConfigPage} from "./WidgetConfigPage";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const TramList = [
    //todo
    { label: 'Hauptfriedhof' },
    { label: 'Mühlburger Tor' },
    { label: 'Durlacher Tor' },
    { label: 'Kronenplatz' },
];

export function TramScheduleConfigPage() {

    return(WidgetConfigPage({content:TramScheduleConfigDialogComponent()}));
}

function TramScheduleConfigDialogComponent() {
    //todo
    //maybe liftup?
    const [value, setValue] = React.useState({label: ''});

    const handleTram = () => {
        console.log('current selected tram has value ' + value.label)
    }

    return(
        <div>
            <DialogTitle>Tram Schedule Settings</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <h1>{`Current Selected Tram Stop:  ${value !== null ? `'${value.label}'` : ''}`}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        Search for tram stop:
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            disablePortal
                            options={TramList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Tram Stop" />}
                            value={value}
                            onChange={(event: any, newValue: {label: string}) => {
                                setValue(newValue);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={handleTram} variant="outlined">
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </div>
    );
}