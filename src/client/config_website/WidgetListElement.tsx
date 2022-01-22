import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import {Button, Grid} from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";


export const WidgetListElement = ({item, handlePosition, handleDeleteWidget, children}) => {

    return (
        <Grid container spacing={2} direction="row" alignItems="center">
            <Grid item>
                {item.name}
            </Grid>
            <Grid item>
                <FormControl>
                    <RadioGroup row>
                        {renderPosition({item:item, position:"1", handlePosition: handlePosition})}
                        {renderPosition({item:item, position:"2", handlePosition: handlePosition})}
                        {renderPosition({item:item, position:"3", handlePosition: handlePosition})}
                        {renderPosition({item:item, position:"4", handlePosition: handlePosition})}
                        {renderPosition({item:item, position:"5", handlePosition: handlePosition})}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <DeleteDialogComponent id={item.id} handleDeleteWidget={handleDeleteWidget}/>
            </Grid>
        </Grid>

    );
}

function renderPosition({item, position, handlePosition}) {
    return(
        <FormControlLabel
            label={position}
            control={
                <Radio
                    checked={item.position === position}
                    onChange={
                        () => {
                            handlePosition(item.id, position)
                        }
                    }
                />
            }
        />
    );
}

function DeleteDialogComponent({id ,handleDeleteWidget}) {
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        console.log('item id in handleOpen is' + id)
        setOpen(true);
    };

    const handleDisagree = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        handleDeleteWidget(id);
        setOpen(false);
    };

    return(
        <Grid item>
            <Button onClick={handleOpen}>
                <DeleteIcon/>
            </Button>
            <Dialog onClose={handleDisagree} open={open}>
                <DialogTitle>Delete this widget?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The changes can't be restored and have to be manually recreated.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleDisagree}>Disagree</Button>
                    <Button variant="outlined" onClick={handleAgree}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}