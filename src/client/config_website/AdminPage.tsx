import * as React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import {AdminStatePersistence} from "../../shared/persistence/AdminStatePersistence";

const adminStatePersistence = new AdminStatePersistence()

export const AdminPage = ({
                              oldPassword,
                              newPassword,
                              handleOldPassword,
                              handleNewPassword,
                              handlePasswordChange,
                              children
                          }) => {
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword)
    }

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    const [successfulBar, setSuccessfulBar] = React.useState(false);
    const [errorBar, setErrorBar] = React.useState(false);
    const [sessionErrorBar, setSessionErrorBar] = React.useState(false);
    const [emptyErrorBar, setEmptyErrorBar] = React.useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessfulBar(false);
        setErrorBar(false);
        setSessionErrorBar(false);
        setEmptyErrorBar(false);
    }

    return (
        <Box
            sx={{
                width: 300,
                height: 300,
            }
            }
        >
            <div>
                <Grid container spacing={2} direction="row" justifyContent="center"
                      alignItems="center">
                    <Grid item xs={12}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                            <InputLabel>Old Password</InputLabel>
                            <Input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={handleOldPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleShowOldPassword}
                                        >
                                            {showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                            <InputLabel>New Password</InputLabel>
                            <Input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={handleNewPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleShowNewPassword}
                                        >
                                            {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => {
                                handlePasswordChange().then(myBoolean => {
                                    if (myBoolean) {
                                        setSuccessfulBar(true);
                                    } else {
                                        if (oldPassword === '' || newPassword === '') {
                                            setEmptyErrorBar(true);
                                        } else {
                                            adminStatePersistence.getAdminLoginState()
                                                .then(() => setErrorBar(true))
                                                .catch(() => setSessionErrorBar(true));
                                        }
                                    }
                                })
                            }}
                            variant="contained"
                        >
                            Save Password
                        </Button>
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={successfulBar}
                            autoHideDuration={2000}
                            onClose={handleClose}
                            message={'Password Saved'}
                        />
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={errorBar}
                            autoHideDuration={2000}
                            onClose={handleClose}
                            message={'Changing Password failed'}
                        />
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={sessionErrorBar}
                            autoHideDuration={2000}
                            onClose={handleClose}
                            message={'Session expired'}
                        />
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={emptyErrorBar}
                            autoHideDuration={2000}
                            onClose={handleClose}
                            message={'Old and new password must not be empty'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}