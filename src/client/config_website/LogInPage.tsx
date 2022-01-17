import * as React from "react";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const LogInPage = ({logInInput, handleInput, handleLogIn, children}) => {

    return (
        <Box
            sx={{
                width: 300,
                height: 300,}
            }
        >
            <div>
                <h1>Log In Admin Interface</h1>
                <TextField
                    value={logInInput}
                    label="Old Password"
                    onChange={handleInput}
                />
                <Button
                    onClick={handleLogIn}
                    variant="outlined"
                >
                    Log In</Button>
            </div>
        </Box>
    );
}