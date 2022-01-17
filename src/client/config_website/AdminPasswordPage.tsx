import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import Button from '@mui/material/Button';

export function AdminPasswordPage() {
    const [newPassword, setNewPassword] = useState('')
    const [password, setPassword] = useState('')

    const handlePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleNewPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPassword(event.target.value);
    };

    //todo
    //Connect with persistence
    const handlePasswordChange = () =>{
        alert('Old Password is ' + password + ' New Password is ' + newPassword)
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
                <TextField
                    value={password}
                    label="Old Password"
                    onChange={handlePassword}
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