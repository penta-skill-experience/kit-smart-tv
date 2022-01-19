import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Button, Checkbox, Grid} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';

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
                                    <FormGroup>
                                        <FormControlLabel
                                            label="1"
                                            control={<Checkbox
                                                checked={widget.position1}
                                                onChange={
                                                () => {handlePosition(widget.id, 1)}
                                            }/>}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel
                                            label="2"
                                            control={<Checkbox
                                                checked={widget.position2}
                                                onChange={
                                                () => {handlePosition(widget.id, 2)}
                                            }/>}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel
                                            label="3"
                                            control={<Checkbox
                                                checked={widget.position3}
                                                onChange={
                                                () => {handlePosition(widget.id, 3)}
                                            }/>}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel
                                            label="4"
                                            control={<Checkbox
                                                checked={widget.position4}
                                                onChange={
                                                () => {handlePosition(widget.id, 4)}
                                            }/>}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel
                                            label="5"
                                            control={<Checkbox
                                                checked={widget.position5}
                                                onChange={
                                                () => {handlePosition(widget.id, 5)}
                                            }/>}
                                        />
                                    </FormGroup>
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