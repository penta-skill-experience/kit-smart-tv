import * as React from "react";
import {Button} from "@mui/material";

export class RootComponent extends React.Component<any, any> {
    render() {
        return <div>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </div>;
    }
}