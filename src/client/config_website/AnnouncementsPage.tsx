import * as React from "react";
import {Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export const AnnouncementsPage = () => {
    const initialMailList = [];
    const [mailList, setMailList] = React.useState(initialMailList);
    const [verUser, setVerUser] = React.useState({
        mail:'',
        name:'',
    });


    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerUser({...verUser, mail:event.target.value});
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerUser({...verUser, name:event.target.value});
    };

    const handleAddMail = () => {
        if (verUser.name !== '' && verUser.mail !== '') {
            const newUser = {
                mail:verUser.mail,
                name:verUser.name,
            }
            setMailList(mailList.concat(newUser));
        }
        alert('Username and email have to be filled out')
    };

    const handleDeleteUser = (mail) => {
        setMailList(mailList.filter(item => item.mail !== mail));
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
                                    <Button onClick={() => {handleDeleteUser(item.mail)}}>
                                        <DeleteIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </ul>
                </Grid>
            </Grid>
        </div>
    );
}