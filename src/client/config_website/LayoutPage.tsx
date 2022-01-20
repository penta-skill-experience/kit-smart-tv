import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, Grid} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';


export const LayoutPage = ({list, widget, handleWidgetSelection, handleAddWidget, handleDeleteWidget, handlePosition, children}) => {

    return(
        <div>
            <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item container spacing={2} direction="row">
                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                            }
                            }
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item  container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <LockIcon color='error'/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                                }
                            }
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item  container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>1.top center</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                            }
                            }
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item  container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>2.top right</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                </Grid>

                <Grid item container spacing={2} direction="row">
                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                            }
                            }
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item  container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>3.bottom left</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                            }
                            }
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item  container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>4.bottom center</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                            }
                            }
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item  container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>5.bottom right</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>

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