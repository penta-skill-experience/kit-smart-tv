import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Button, Checkbox, Grid} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';

export const LayoutPage = ({list, widget, handleWidgetSelection, handleAddWidget, children}) => {

    return(
        <div>
            <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item>
                    <ul>
                        {list.map(widget => (
                            <Grid container spacing={2} direction="row" alignItems="center">
                                <Grid item>
                                    {widget}
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="1" />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="2" />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="3" />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="4" />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="5" />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <Button>
                                        <DeleteIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                            //<li key={item}>{item}</li>
                        ))}
                    </ul>
                </Grid>
                <Grid item>
                    <FormControl sx={{minWidth: 120}}>
                        <Select
                            value={widget}
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