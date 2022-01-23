import Typography from '@mui/material/Typography';
import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {PersonalizationPage} from "./PersonalizationPage";
import {LayoutPage} from "./LayoutPage";
import {AdminPage} from "./AdminPage";
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {LogInPage} from "./LogInPage";
import {Button, Grid} from "@mui/material";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export function ConfigWebsite() {
    //state variables and methods for login page
    const password = 'password123';
    const [logInInput, setLogInInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [loggedInStatus, setLoggedInStatus] = useState(false);

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLogInInput(event.target.value);
    };

    const handleLogIn= () => {
        // todo
        // connect with persistence
        if (logInInput === password) {
            setLoggedInStatus(true);
        } else {
            alert('password not correct')
        }
    };

    const handleClickShowPassword = () => {
        setVisible(!visible)
    }

    //state variables and methods for tabs
    const [pageNumber, setPageNumber] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPageNumber(newValue);
    };

    //state variables and methods for personalization page
    const [colorScheme,setColorScheme] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState<string | null>(null);

    const handleColorSchemeChange = (
        event: React.MouseEvent<HTMLElement>,
        newColorScheme: string | null,
    ) => {
        setColorScheme(newColorScheme);
    };

    const handleFontSizeChange = (
        event: React.MouseEvent<HTMLElement>,
        newFontSize: string | null,
    ) => {
        setFontSize(newFontSize);
    };

    //state variables and methods for layout page
    const initialList = [];
    const [counter, setCounter] = useState(1);
    const [list, setList] = React.useState(initialList);
    const [widget, setWidget] = React.useState({
        id:0,
        name:'',
        position:'',
        configurable:false
    });

    const incrementCounter = () => setCounter(counter + 1);

    const handleWidgetSelection = (event: SelectChangeEvent) => {
        //todo
        //config is not always true
        const updatedValue = {
            id:counter,
            name:event.target.value,
            position:'',
            configurable:true,
        }
        setWidget(updatedValue)
    };

    const handleAddWidget = () => {
        if (widget.name !== '') {
            const newWidget = {
                //todo
                //config is not always true
                id:counter,
                name:widget.name,
                position:'',
                configurable:true,
            }
            setList(list.concat(newWidget));
            incrementCounter();
            console.log('Added widget ' + newWidget.name + ' with id ' + newWidget.id)
        }
    };

    const handleDeleteWidget = (id) => {
        console.log('Widget with id ' + id + ' is removed ')
        setList(list.filter(item => item.id !== id));
    }

    const handlePosition = (id, position) => {
        const newList = list.map((item) => {
            if (item.id === id) {
                const newWidget = { ...item, position: position }
                return newWidget;
            } else {
                return item;
            };
        });

        setList(newList);

    }

    //state variables and methods for admin password page
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')

    const handleOldPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOldPassword(event.target.value);
    };

    const handleNewPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewPassword(event.target.value);
    };

    //todo
    //Connect with persistence
    const handlePasswordChange = () => {
        alert('Old Password is ' + oldPassword + ' New Password is ' + newPassword)
    };

    const handleChangeSave = () => {
        if (colorScheme === null || fontSize === null) {
            alert('Color scheme and font size must be chosen')
        }
    };

    const handleLogout = () => {
        setLoggedInStatus(false);
    }

    function renderConfigWebsite() {
        if(loggedInStatus === false) {
            return (
                <LogInPage
                    logInInput={logInInput}
                    visible={visible}
                    handleInput={handleInput}
                    handleLogIn={handleLogIn}
                    handleClickShowPassword={handleClickShowPassword}
                >
                </LogInPage>
            );
        } else {
            return (
                <div>
                    <Box sx={{
                        border: 1,
                        backgroundColor:'text.primary',}
                    }>
                        <Grid container spacing={2} direction="row" alignItems="center">
                            <Grid item xs={2}></Grid>
                            <Grid item container xs={8} alignItems="center" justifyContent="center">
                                <Grid item container alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <Typography variant="h6" color='white'>Admin Interface</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container xs={2} direction="column">
                                <Button onClick={handleLogout}>
                                    Log Out
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={pageNumber} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Personalization"/>
                            <Tab label="Layout"/>
                            <Tab label="Password"/>
                        </Tabs>
                    </Box>
                    <TabPanel value={pageNumber} index={0}>
                        <PersonalizationPage
                            colorScheme={colorScheme}
                            fontSize={fontSize}
                            handleColorSchemeChange={handleColorSchemeChange}
                            handleFontSizeChange={handleFontSizeChange}
                        >
                        </PersonalizationPage>

                    </TabPanel>
                    <TabPanel value={pageNumber} index={1}>
                        <LayoutPage
                            list={list}
                            widget={widget}
                            handleWidgetSelection={handleWidgetSelection}
                            handleAddWidget={handleAddWidget}
                            handleDeleteWidget={handleDeleteWidget}
                            handlePosition={handlePosition}
                        >
                        </LayoutPage>
                    </TabPanel>
                    <TabPanel value={pageNumber} index={2}>
                        <AdminPage
                            oldPassword={oldPassword}
                            newPassword={newPassword}
                            handleOldPassword={handleOldPassword}
                            handleNewPassword={handleNewPassword}
                            handlePasswordChange={handlePasswordChange}
                            handleChangeSave={handleChangeSave}
                        >
                        </AdminPage>
                    </TabPanel>
                </div>
            );
        }

    }

    return(<div>
            {renderConfigWebsite()}
        </div>
    );
}





