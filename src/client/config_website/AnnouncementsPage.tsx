import * as React from "react";
import {Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import {AdminStatePersistence} from "../../shared/persistence/AdminStatePersistence";

const adminStatePersistence = new AdminStatePersistence();

export const AnnouncementsPage = ({mailList, verUser, handleMailChange, handleNameChange, handleAddMail, handleDeleteUser, handleVerUserList, children}) => {
    const [open, setOpen] = React.useState(false);
    const [sessionBar, setSessionBar] = React.useState(false);
    const [invalidMailBar, setInvalidMailBar] = React.useState(false);
    const [doubleMailBar, setDoubleMailBar] = React.useState(false);
    const [emptyErrorBar, setEmptyErrorBar] = React.useState(false);


    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSessionBar(false);
        setInvalidMailBar(false);
        setDoubleMailBar(false);
        setEmptyErrorBar(false);
    }

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
                    <Button variant="outlined" onClick={() => {
                        const errorType = handleAddMail();
                        console.log(errorType);
                        if (errorType === 0) {
                            setInvalidMailBar(true);
                        }
                        if (errorType === 1) {
                            setDoubleMailBar(true);
                        }
                        if (errorType === 2) {
                            setEmptyErrorBar(true);
                        }
                    }}>
                        Add
                    </Button>
                    <Snackbar
                        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                        open={invalidMailBar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'E-Mail does not exist'}
                    />
                    <Snackbar
                        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                        open={doubleMailBar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'This E-Mail already exists'}
                    />
                    <Snackbar
                        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                        open={emptyErrorBar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'Username and email have to be filled out'}
                    />
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
                <Grid item xs={12}>
                    <Button variant='contained' onClick={() => {
                        handleVerUserList();
                        adminStatePersistence.getAdminLoginState()
                            .then(() => setOpen(true))
                            .catch(() => setSessionBar(true));
                    }}>
                        Save Changes
                    </Button>
                    <Snackbar
                        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'Verified Users Saved'}
                    />
                    <Snackbar
                        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                        open={sessionBar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'Session expired'}
                    />
                </Grid>
            </Grid>
        </div>
    );
}