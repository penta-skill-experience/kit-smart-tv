import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const AdminPasswordPage = ({oldPassword, newPassword, handleOldPassword, handleNewPassword, handlePasswordChange, children} ) => {

    return (
        <Box
        sx={{
            width: 300,
            height: 300,
            }
        }
        >
            <div>
                <TextField
                    value={oldPassword}
                    label="Old Password"
                    onChange={handleOldPassword}
                />
                <TextField
                    value={newPassword}
                    label="New Password"
                    onChange={handleNewPassword}
                />
                <Button
                    onClick={handlePasswordChange}
                    variant="outlined"
                >
                    Save Password</Button>
            </div>
        </Box>
    );

}