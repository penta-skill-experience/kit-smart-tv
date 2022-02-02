import * as React from "react";
import {Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export const AnnouncementsPage = ({mailList, verUser, handleMailChange, handleNameChange, handleAddMail, handleDeleteUser, handleVerUserList, children}) => {

    return(
        <div>
            <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={12}>
                    <h1>Add e-mail as verified: </h1>
                </Grid>
                <Grid item>
                    <TextField
                        label="E-Mail"
                        value={verUser.mail}
                        onChange={handleMailChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Name"
                        value={verUser.name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={handleAddMail}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <h1>Currently verified accounts:</h1>
                </Grid>
                <Grid item xs={4}>
                    Email
                </Grid>
                <Grid item xs={2}>
                    Name
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={12}>
                    <ul>
                        {mailList.map(item => (
                            <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item xs={4}>
                                    {item.mail}
                                </Grid>
                                <Grid item xs={1}>
                                    {item.name}
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={() => {handleDeleteUser(item)}}>
                                        <DeleteIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </ul>
                </Grid>
                <Grid xs={12}>
                    <Button variant='outlined' onClick={handleVerUserList}>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}