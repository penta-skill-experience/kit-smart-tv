import * as React from "react";
import {DialogContent} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {ConfigComponent, ConfigComponentProps} from "../../widget/ConfigComponent";

const tramList = [
    //todo
    { label: 'Hauptfriedhof' },
    { label: 'Mühlburger Tor' },
    { label: 'Durlacher Tor' },
    { label: 'Kronenplatz' },
];

interface TramScheduleConfigState {
    value: string;
}

export class TramScheduleConfigComponent extends ConfigComponent<TramScheduleConfigState> {

    constructor(props: Readonly<ConfigComponentProps> | ConfigComponentProps) {
        super(props);

        this.state = {
            value: this.props.config["stop"],
        }
    }

    save(): Object {
        return {
            stop: this.state.value,
        };
    }

    render() {
        return <div>
            <DialogTitle>Tram Schedule Settings</DialogTitle>
            <DialogContent>
                <h1>{`Current Selected Tram Stop:  ${this.state.value !== null ? `'${this.state.value}'` : ''}`}</h1>
                <Autocomplete
                    disablePortal
                    options={tramList}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Tram Stop" />}
                    value={this.state.value}
                    onChange={(event: any, newValue: string) => {
                        this.setState({value: newValue});
                    }}
                />
            </DialogContent>
        </div>;
    }
}