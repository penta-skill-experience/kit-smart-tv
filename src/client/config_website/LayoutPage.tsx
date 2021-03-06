import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockIcon from '@mui/icons-material/Lock';
import {WidgetListElement} from "./WidgetListElement";
import {WidgetLoader} from "../widget/WidgetLoader";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from '@mui/material/InputLabel';
import {AdminStatePersistence} from "../../shared/persistence/AdminStatePersistence";


const widgetLoader = new WidgetLoader();
const widgetList = widgetLoader.getWidgetIds();
const adminStatePersistence = new AdminStatePersistence();

export const LayoutPage = ({
                               list,
                               widgetListElement,
                               handleWidgetSelection,
                               handleAddWidget,
                               handleDeleteWidget,
                               handlePosition,
                               handleRawConfigSave,
                               handleLayoutChange,
                               handleLogOut,
                               children
                           }) => {

    const [open, setOpen] = React.useState(false);
    const [sessionBar, setSessionBar] = React.useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSessionBar(false);
    }

    return (
        <div>
            <Grid container spacing={2} direction="row" justifyContent="flex-start"
                  alignItems="flex-start">
                <Grid item container spacing={2} direction="row" xs={12}>
                    <Grid item>
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: 'text.primary',
                            }
                            }
                        >
                            <Grid container direction="row" alignItems="center"
                                  justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item container alignItems="center" justifyContent="center">
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
                            <Grid container direction="row" alignItems="center"
                                  justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>1.top
                                            center</Typography>
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
                            <Grid container direction="row" alignItems="center"
                                  justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>2.top
                                            right</Typography>
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
                            <Grid container direction="row" alignItems="center"
                                  justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>3.bottom
                                            left</Typography>
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
                            <Grid container direction="row" alignItems="center"
                                  justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>4.bottom
                                            center</Typography>
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
                            <Grid container direction="row" alignItems="center"
                                  justifyContent="space-between">
                                <Grid item xs={12}>''</Grid>
                                <Grid item xs={12}>''</Grid>
                                <Grid item container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>5.bottom
                                            right</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <ul>
                        {list.map(item => (
                            <WidgetListElement
                                item={item}
                                handlePosition={handlePosition}
                                handleDeleteWidget={handleDeleteWidget}
                                handleRawConfigSave={handleRawConfigSave}
                            >
                            </WidgetListElement>
                        ))}
                    </ul>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{minWidth: 150}}>
                        <InputLabel>Select Widget</InputLabel>
                        <Select
                            key={widgetListElement.id}
                            value={widgetListElement.widgetNameText}
                            onChange={handleWidgetSelection}
                            label={"Select Widget"}
                        >
                            {widgetList.map(item => (
                                <MenuItem value={item}>
                                    {widgetLoader.getWidget(item).getTitle()}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleAddWidget} variant="outlined">Add Widget</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => {
                        handleLayoutChange();
                        adminStatePersistence.getAdminLoginState()
                            .then(() => setOpen(true))
                            .catch(() => handleLogOut())
                    }}>
                        Save Changes
                    </Button>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'Changes Saved'}
                    />
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        open={sessionBar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'Session expired'}
                    />
                </Grid>
            </Grid>
        </div>
    );
};