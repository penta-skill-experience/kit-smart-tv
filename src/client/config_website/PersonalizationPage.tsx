import * as React from "react";
import {FormLabel, Grid} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from "@mui/material/Button";
import {DesignValuesPersistence} from "../../shared/persistence/DesignValuesPersistence";
import {ColorScheme} from "../../shared/values/ColorScheme";
import {ConfigData, ValuesData} from "../../shared/interfaces/interfaces";
import {DesignConfigPersistence} from "../../shared/persistence/DesignConfigPersistence";
import Snackbar from "@mui/material/Snackbar";
import {AdminStatePersistence} from "../../shared/persistence/AdminStatePersistence";

interface PersonalizationPageProps {
    colorScheme: string;
    fontSize: string;
    handleColorSchemeChange: any;
    handleFontSizeChange: any;
    selectedBackground: any;
    handleBackgroundSelect: any;
    handlePersonalizationChange: any;
    children: any;
}

interface PersonalizationPageState {
    loadedDesignState: boolean;
    designValues: ValuesData;
    designConfig: ConfigData;
    successfulBar:boolean;
    errorBar:boolean;
    sessionErrorBar:boolean;
}

const adminStatePersistence = new AdminStatePersistence();

export class PersonalizationPage extends React.Component<PersonalizationPageProps, PersonalizationPageState> {



    constructor(props: Readonly<PersonalizationPageProps> | PersonalizationPageProps) {
        super(props);
        this.state = {
            loadedDesignState: false,
            designValues: undefined,
            designConfig: undefined,
            successfulBar:false,
            errorBar:false,
            sessionErrorBar:false,
        };
    }

    componentDidMount() {
        this.queryDesignState();
    }

    private queryDesignState(): void {
        new DesignValuesPersistence().getValuesData().then(valuesData => {
            new DesignConfigPersistence().getConfigData().then(configData => this.setState({
                loadedDesignState: true,
                designValues: valuesData,
                designConfig: configData,
            }));
        });
    }

    handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({successfulBar:false, errorBar:false, sessionErrorBar:false});
    }

    render() {
        return (
            <div>
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>Choose your color scheme:</FormLabel>
                            <RadioGroup onChange={this.props.handleColorSchemeChange} value={this.props.colorScheme}>
                                {this.state.loadedDesignState &&
                                    this.state.designValues.colorSchemes.map(colorScheme =>
                                        <FormControlLabel
                                            value={colorScheme.id}
                                            control={<Radio/>}
                                            label={colorScheme.name}
                                        />
                                    )}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>Choose your preferred font size:</FormLabel>
                            <RadioGroup onChange={this.props.handleFontSizeChange} value={this.props.fontSize}>
                                {this.state.loadedDesignState &&
                                    this.state.designValues.fontSizes.map(fontSize =>
                                        <FormControlLabel
                                            value={fontSize.id}
                                            control={<Radio/>}
                                            label={fontSize.name}
                                        />
                                    )}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.loadedDesignState &&
                            this.renderBackgroundImages()}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => {
                                this.props.handlePersonalizationChange().then(myBoolean => {
                                    if (myBoolean) {
                                        this.setState({successfulBar:true})
                                    } else {
                                        adminStatePersistence.getAdminLoginState()
                                            .then(() => this.setState({errorBar:true}))
                                            .catch(() => this.setState({sessionErrorBar:true}))
                                    }
                                })
                            }}
                            variant="outlined"
                        >
                            Save Changes
                        </Button>
                        <Snackbar
                            open={this.state.successfulBar}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message={'Changes Saved'}
                        />
                        <Snackbar
                            open={this.state.errorBar}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message={'Color scheme, font size and a background must be chosen'}
                        />
                        <Snackbar
                            open={this.state.sessionErrorBar}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message={'Session expired'}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

    private renderBackgroundImages() {

        // selected color scheme:
        const colorScheme: ColorScheme = this.state.designValues.colorSchemes.find(c => c.id === this.props.colorScheme);

        if (!colorScheme) return <></>;

        return <div>
            <h1>Available backgrounds for color scheme {colorScheme.name}:</h1>
            <ImageList sx={{width: 680, height: 450}} cols={4} rowHeight={164}>
                {colorScheme.backgrounds.map(backgroundUrl => (
                    <div>
                        <Grid container spacing={2} direction="column" justifyContent="center"
                              alignItems="center">
                            <Grid item>
                                <ImageListItem key={backgroundUrl}>
                                    <img
                                        src={`${backgroundUrl}`}
                                        loading="lazy"
                                        alt = "background image"
                                    style = {{
                                        width: "164px",
                                        height:"164px",
                                        objectFit: "cover"
                                    }}/>
                                </ImageListItem>
                            </Grid>
                            <Grid item>
                                <Radio
                                    checked={this.props.selectedBackground === backgroundUrl}
                                    onChange={event => this.props.handleBackgroundSelect(event.target.value)}
                                    value={backgroundUrl}
                                />
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </ImageList>
        </div>;
    }
}