import * as React from "react";
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LogInPage = ({
                              logInInput,
                              handleInput,
                              visible,
                              handleLogIn,
                              handleClickShowPassword,
                              children
                          }) => {


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "70%",
        }}>
            <h1 className="text-lg">Admin Interface</h1>
            <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                <InputLabel>Password</InputLabel>
                <Input
                    type={visible ? 'text' : 'password'}
                    value={logInInput}
                    onChange={handleInput}
                    onKeyDown={e => {
                        if (e.key === "Enter") handleLogIn();
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                            >
                                {visible ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button onClick={handleLogIn} variant="contained">Log In</Button>
        </div>
    );
}