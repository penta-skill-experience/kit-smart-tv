import * as React from "react";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LogInPage = ({logInInput, handleInput, visible, handleLogIn, handleClickShowPassword, children}) => {

    return (
        <div>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <h1 className="text-lg">Log In Admin Interface</h1>
                </Grid>

                <Grid item>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel>Password</InputLabel>
                    <Input
                        type={visible ? 'text' : 'password'}
                        value={logInInput}
                        onChange={handleInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                >
                                    {visible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleLogIn}
                        variant="outlined"
                    >
                        Log In</Button>
                </Grid>
            </Grid>
        </div>
    );
}