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
    const [loggedInStatus, setLoggedInStatus] = useState(false);

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLogInInput(event.target.value);
    };

    const handleLogIn= () => {
        // to do
        // connect with persistence
        if (logInInput === password) {
            setLoggedInStatus(true);
        } else {
            alert('password not correct')
        }
    };

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
    const [list, setList] = React.useState(initialList);
    const [widget, setWidget] = React.useState({
        id:0,
        name:'',
        position1:false,
        position2:false,
        position3:false,
        position4:false,
        position5:false,
        configurable:false,
    });

    const handleWidgetSelection = (event: SelectChangeEvent) => {
        const updatedValue = {
            id:0,
            name:event.target.value,
            position1:false,
            position2:false,
            position3:false,
            position4:false,
            position5:false,
            configurable:false,
        }
        setWidget(updatedValue)
    };

    const handleAddWidget = () => {
        if (widget.name !== '') {
            setList(list.concat(widget));
        }
    };

    const handleDeleteWidget = id => {
        setList(list.filter(item => item.id !== id));
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
                    handleInput={handleInput}
                    handleLogIn={handleLogIn}
                >
                </LogInPage>
            );
        } else {
            return (
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={pageNumber} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Personalization"/>
                            <Tab label="Layout"/>
                            <Tab label="Admin"/>
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
                            handleLogout={handleLogout}
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





