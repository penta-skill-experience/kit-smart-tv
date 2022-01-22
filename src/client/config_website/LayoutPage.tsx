import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, Grid} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {WidgetListElement} from "./WidgetListElement";



export const LayoutPage = ({list, widget, handleWidgetSelection, open, handleAddWidget, handleDeleteWidget, handlePosition, children}) => {

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
                        {list.map(item => (
                            <WidgetListElement item={item} handlePosition={handlePosition} handleDeleteWidget={handleDeleteWidget}>
                            </WidgetListElement>
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



const DeleteButton = (item, open, handleOpen, handleDisagree, handleAgree, children) => {

    return (
        <div>
            <Button onClick={handleOpen}>
                <DeleteIcon/>
            </Button>
            <Dialog
                open={open}
                onClose={handleDisagree}
            >
                <DialogTitle>
                    {"Delete this widget?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The changes can't be restored and have to be manually recreated.
                        Delete {item.name} with id {item.id}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree}>Disagree</Button>
                    <Button onClick={() =>{handleAgree(item.id)}}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}




