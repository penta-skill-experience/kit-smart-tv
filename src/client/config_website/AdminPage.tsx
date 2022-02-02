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

export const AdminPage = ({oldPassword, newPassword, handleOldPassword, handleNewPassword, handlePasswordChange, children} ) => {
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleShowOldPassword  = () => {
        setShowOldPassword(!showOldPassword)
    }

    const handleShowNewPassword  = () => {
        setShowNewPassword(!showNewPassword)
    }

    const [successfulBar, setSuccessfulBar] = React.useState(false);
    const [errorBar, setErrorBar] = React.useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessfulBar(false);
        setErrorBar(false);
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
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
                                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
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
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => {
                                if (handlePasswordChange()) {
                                    setSuccessfulBar(true);
                                } else{
                                    setErrorBar(true);
                                }
                            }}
                            variant="outlined"
                        >
                            Save Password
                        </Button>
                        <Snackbar
                            open={successfulBar}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message={'Password Saved'}
                        />
                        <Snackbar
                            open={errorBar}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message={'New Password must at least be 1 character long'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}