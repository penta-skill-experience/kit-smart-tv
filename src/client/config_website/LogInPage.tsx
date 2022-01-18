import * as React from "react";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";

export const LogInPage = ({logInInput, handleInput, handleLogIn, children}) => {

    return (
        <div>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <h1 className="text-lg">Log In Admin Interface</h1>
                </Grid>
                <Grid item>
                    <TextField
                        value={logInInput}
                        label="Enter Password"
                        onChange={handleInput}
                    />
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