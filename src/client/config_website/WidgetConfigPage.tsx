import * as React from "react";
import {Button, ButtonGroup, Grid} from "@mui/material";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import Dialog from '@mui/material/Dialog';
import {ConfigComponent} from "../widget/ConfigComponent";

interface WidgetConfigPageProps {
    configComponentClass: typeof ConfigComponent;
    save: (rawConfig: Object) => void;
    rawConfig: Object;
}

interface WidgetConfigPageState {
    open: boolean;
}

export class WidgetConfigPage extends React.Component<WidgetConfigPageProps, WidgetConfigPageState> {

    private configComponentRef = React.createRef<ConfigComponent<any>>();

    constructor(props: Readonly<WidgetConfigPageProps> | WidgetConfigPageProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    private open() {
        this.setState({open: true});
    }

    private close() {
        this.setState({open: false});
    }

    private save() {
        this.props.save(this.configComponentRef.current.save());
    }

    render() {
        return <Grid item>
            <Button onClick={() => this.open()}>
                <MiscellaneousServicesIcon/>
            </Button>
            <Dialog onClose={() => this.close()} open={this.state.open} maxWidth={'xl'}
                    PaperProps={{
                        sx: {
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }}>
                {
                    // @ts-ignore
                    React.createElement(this.props.configComponentClass, {
                        config: this.props.rawConfig,
                        ref: this.configComponentRef
                    }, null)
                }
                <ButtonGroup>
                    <Button variant="outlined" onClick={() => this.close()}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => {
                        this.save();
                        this.close();
                    }}>
                        OK
                    </Button>
                </ButtonGroup>
            </Dialog>
        </Grid>;
    }
}
