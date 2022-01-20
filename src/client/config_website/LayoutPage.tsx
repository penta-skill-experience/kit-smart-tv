import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Button, Checkbox, Grid} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


export const LayoutPage = ({list, widget, handleWidgetSelection, handleAddWidget, handleDeleteWidget, handlePosition, children}) => {

    return(
        <div>
            <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item>
                    <ul>
                        {list.map(widget => (
                            <Grid container spacing={2} direction="row" alignItems="center">
                                <Grid item>
                                    {widget.name}
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                        >
                                            <FormControlLabel
                                                label="1"
                                                control={
                                                <Radio
                                                    checked={widget.position === "1"}
                                                    onChange={
                                                        () => {
                                                            handlePosition(widget.id, "1")
                                                        }
                                                     }
                                                />
                                                }
                                            />
                                            <FormControlLabel
                                                label="2"
                                                control={
                                                <Radio
                                                    checked={widget.position === "2"}
                                                    onChange={
                                                        () => {
                                                            handlePosition(widget.id, "2")
                                                        }
                                                    }/>
                                                 }
                                            />
                                            <FormControlLabel
                                                label="3"
                                                control={
                                                    <Radio
                                                        checked={widget.position === "3"}
                                                        onChange={
                                                            () => {
                                                                handlePosition(widget.id, "3")
                                                            }
                                                        }/>
                                                }
                                            />
                                            <FormControlLabel
                                                label="4"
                                                control={
                                                    <Radio
                                                        checked={widget.position === "4"}
                                                        onChange={
                                                            () => {
                                                                handlePosition(widget.id, "4")
                                                            }
                                                        }/>
                                                }
                                            />
                                            <FormControlLabel
                                                label="5"
                                                control={
                                                    <Radio
                                                        checked={widget.position === "5"}
                                                        onChange={
                                                            () => {
                                                                handlePosition(widget.id, "5")
                                                            }
                                                        }/>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleDeleteWidget(widget.id)}>
                                        <DeleteIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </ul>
                </Grid>
                <Grid item>
                    <FormControl sx={{minWidth: 120}}>
                        <Select
                            value={widget.name}
                            onChange={handleWidgetSelection}
                        >
                            //todo
                            //Add widgets
                            <MenuItem value={'test1'}>Test1</MenuItem>
                            <MenuItem value={'test2'}>Test2</MenuItem>
                            <MenuItem value={'test3'}>Test3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button onClick={handleAddWidget} variant="outlined">Add Widget</Button>
                </Grid>
            </Grid>
        </div>
    );
};