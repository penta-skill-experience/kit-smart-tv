import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";

export const AdminPage = ({oldPassword, newPassword, handleOldPassword, handleNewPassword, handlePasswordChange, handleChangeSave, children} ) => {
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleShowOldPassword  = () => {
        setShowOldPassword(!showOldPassword)
    }

    const handleShowNewPassword  = () => {
        setShowNewPassword(!showNewPassword)
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
                            onClick={handlePasswordChange}
                            variant="outlined"
                        >
                            Save Password</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleChangeSave}
                            variant="outlined"
                        >
                            Save Changes</Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}