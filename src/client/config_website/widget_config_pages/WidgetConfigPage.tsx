import * as React from "react";
import {Button, Grid} from "@mui/material";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import Dialog from '@mui/material/Dialog';

export function WidgetConfigPage({content}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return(
        <Grid item>
            <Button onClick={handleOpen}>
                <MiscellaneousServicesIcon/>
            </Button>
            <Dialog onClose={handleClose} open={open}>
                {content}
            </Dialog>
        </Grid>
    );
}