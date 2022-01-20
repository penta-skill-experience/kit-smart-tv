import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";

export const AdminPage = ({oldPassword, newPassword, handleOldPassword, handleNewPassword, handlePasswordChange, handleChangeSave, children} ) => {

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
                        <TextField
                            value={oldPassword}
                            label="Old Password"
                            onChange={handleOldPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={newPassword}
                            label="New Password"
                            onChange={handleNewPassword}
                        />
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