import * as React from "react";
import {CircularProgress, DialogContent} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {ConfigComponent, ConfigComponentProps} from "../../widget/ConfigComponent";
import * as TramScheduleConfig from "./TramSchedule.json";
import config from "../../../shared/persistence/persistence.config.json";
import {TramScheduleUtility} from "./TramScheduleUtility";

interface TramScheduleConfigState {
    value: string;
    suggestions: string[];
    usedQuery: string;  // the query that the current list of suggestions resulted from
}

export class TramScheduleConfigComponent extends ConfigComponent<TramScheduleConfigState> {

    constructor(props: Readonly<ConfigComponentProps> | ConfigComponentProps) {
        super(props);

        this.state = {
            value: this.props.config["stop"],
            suggestions: [],
            usedQuery: "",
        }
    }

    save(): Object {
        return {
            stop: this.state.value,
        };
    }

    private querySuggestions(text: string) {
        TramScheduleUtility.requestStops(text)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.stops.map(stop => stop.name));
                this.setState({
                    usedQuery: text,
                    suggestions: data.stops.map(stop => stop.name),
                });
            });
    }

    componentDidUpdate(prevProps: Readonly<ConfigComponentProps>, prevState: Readonly<any>, snapshot?: any) {
        const queryString = this.state.value;
        if (queryString !== this.state.usedQuery) {
            if (!queryString) {
                this.setState({
                    usedQuery: queryString,
                    suggestions: [],
                });
            } else {
                this.querySuggestions(queryString);
            }
        }
    }

    render() {
        const loading = this.state.open && this.state.suggestions.length === 0;
        return <div>
            <DialogTitle>Tram Schedule Settings</DialogTitle>
            <DialogContent>
                <div style={{minHeight: "300px", paddingTop: "10px"}}>
                    <Autocomplete
                        filterSelectedOptions
                        autoComplete
                        sx={{ width: 300 }}
                        options={this.state.suggestions}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tram Stop"
                            />
                        )}
                        value={this.state.value}
                        inputValue={this.state.value}
                        onChange={(event: any, newValue: string) => {
                            this.setState({value: newValue || ""});
                        }}
                        onInputChange={(event, newValue) => {
                            this.setState({value: newValue || ""});
                        }}
                    />
                </div>
            </DialogContent>
        </div>;
    }
}