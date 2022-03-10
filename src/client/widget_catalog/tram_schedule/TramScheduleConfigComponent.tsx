import * as React from "react";
import {DialogContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {ConfigComponent, ConfigComponentProps} from "../../widget/ConfigComponent";
import {TramScheduleUtility} from "./TramScheduleUtility";
import {Label} from "@mui/icons-material";

interface Suggestion {
    name: string;  // tram stop name
    id: string;    // tram stop ID
}

interface TramScheduleConfigState {
    value: string;  // the current search string
    suggestions: Suggestion[];
    usedQuery: string;  // the query that the current list of suggestions resulted from

    selectedCount: number;
}

export class TramScheduleConfigComponent extends ConfigComponent<TramScheduleConfigState> {

    constructor(props: Readonly<ConfigComponentProps> | ConfigComponentProps) {
        super(props);

        this.state = {
            value: "",
            suggestions: [],
            usedQuery: "",
            selectedCount: this.props.config["count"],
        }
    }

    save(): Object {
        return {
            stop: this.getSelectedId(),
            count: this.state.selectedCount,
        };
    }

    private getSelectedId(): string {
        if (this.state.suggestions.length) {
            return (this.state.suggestions[0] as Suggestion).id;
        } else {
            return "";
        }
    }

    componentDidMount() {
        // initially, request the name for the stop ID that was previously set
        const stopId = this.props.config["stop"];
        TramScheduleUtility.requestStopName(stopId)
            .then(stopName => {
                if (stopName) {
                    this.setState({
                        value: stopName,
                    });
                }
            });
    }

    componentDidUpdate(prevProps: Readonly<ConfigComponentProps>, prevState: Readonly<any>, snapshot?: any) {

        let queryString: string = this.state.value;

        // strip #[id] from query string
        const sliceStart = queryString.indexOf(" #");
        if (sliceStart !== -1) {
            queryString = queryString.slice(0, sliceStart);
        }

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

    private querySuggestions(text: string) {
        TramScheduleUtility.requestStops(text)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    usedQuery: text,
                    suggestions: data.stops.map(stop => ({
                        name: stop.name,
                        id: stop.id,
                    })),
                });
            });
    }

    /**
     * Generate a list of stop names.
     * If any stop name is contained more than once,
     * also add the unique ID of the stop to the name.
     * @private
     */
    private getSuggestionEntries(): string[] {

        // count how many times each name is in the array
        const count: Map<string, number> = new Map();  // mapping name -> count
        this.state.suggestions.forEach((s: Suggestion) => {
            const c = count.get(s.name) || 0;
            count.set(s.name, c + 1);
        });
        return this.state.suggestions.map((s: Suggestion) =>
            count.get(s.name) > 1 ?
                `${s.name} #${s.id}` : s.name
        );
    }

    render() {
        const isLoading = this.state.open && this.state.suggestions.length === 0;
        return <div>
            <DialogTitle>Tram Schedule Settings</DialogTitle>
            <DialogContent>
                <div style={{
                    minHeight: "300px",
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                }}>
                    <Autocomplete
                        filterSelectedOptions
                        autoComplete
                        sx={{width: 300}}
                        options={this.getSuggestionEntries()}
                        loading={isLoading}
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
                    <div style={{height: 50}}/>
                    <span>Number of Entries to Display:</span>
                    <Select
                        style={{width: 300}}
                        value={this.state.selectedCount}
                        onChange={event => this.setState({selectedCount: event.target.value})}>
                        {[1, 2, 3, 4, 5].map(count => <MenuItem value={count}>{count}</MenuItem>)}
                    </Select>
                </div>
            </DialogContent>
        </div>;
    }
}