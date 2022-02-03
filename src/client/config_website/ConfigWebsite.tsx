import Typography from '@mui/material/Typography';
import * as React from "react";
import {useEffect, useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {PersonalizationPage} from "./PersonalizationPage";
import {LayoutPage} from "./LayoutPage";
import {AdminPage} from "./AdminPage";
import {SelectChangeEvent} from "@mui/material/Select";
import {LogInPage} from "./LogInPage";
import {Button, Grid} from "@mui/material";
import {AnnouncementsPage} from "./AnnouncementsPage";
import * as emailValidator from "email-validator";
import {DesignConfigPersistence} from "../../shared/persistence/DesignConfigPersistence";
import {WidgetLoader} from "../widget/WidgetLoader";
import {WidgetData} from "../widget/WidgetData";
import {WidgetPersistence} from "../../shared/persistence/WidgetPersistence";
import {VerifiedUser} from "../../shared/values/VerifiedUser";
import {AnnouncementPersistence} from "../../shared/persistence/announcements/AnnouncementPersistence";
import {AdminStatePersistence} from "../../shared/persistence/AdminStatePersistence";
import Snackbar from '@mui/material/Snackbar';


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

const designConfigPersistence = new DesignConfigPersistence();
const widgetLoader = new WidgetLoader();
const widgetPersistence = new WidgetPersistence();
const announcementPersistence = AnnouncementPersistence.getInstance();
const adminStatePersistence = new AdminStatePersistence();

export function ConfigWebsite() {
    //state variables and methods for login page
    const [logInInput, setLogInInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [adminState, setAdminState] = useState(true);

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLogInInput(event.target.value);
    };

    const handleLogIn= () => {
        adminStatePersistence.login(logInInput)
            .then(() => setLoggedInStatus(true))
            .catch(() => alert('Password not correct.'));
    };

    const handleClickShowPassword = () => {
        setVisible(!visible)
    };

    useEffect( () => {
        if (adminState) {
            adminStatePersistence.getAdminLoginState()
                .then(() => setLoggedInStatus(true))
                .catch(() => console.log('Not already logged in'))
            ;
        }
        setAdminState(false);
    });

    //state variables and methods for tabs
    const [pageNumber, setPageNumber] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPageNumber(newValue);
    };

    //state variables and methods for personalization page
    const [colorScheme,setColorScheme] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState<string | null>(null);
    const [selectedBackground, setSelectedBackground] = React.useState('');
    const [needConfigData, setNeedConfigData] = React.useState(true);

    const handleColorSchemeChange = (event: React.MouseEvent<HTMLElement>, newColorScheme: string | null) => {
        setColorScheme(newColorScheme);
        setSelectedBackground('');
    };

    const handleFontSizeChange = (
        event: React.MouseEvent<HTMLElement>,
        newFontSize: string | null,
    ) => {
        setFontSize(newFontSize);
    };

    const handlePersonalizationChange = () => {
        return designConfigPersistence.setConfigData({
            colorScheme: colorScheme,
            fontSize: fontSize,
            background: selectedBackground,
        })
            .then(() => true)
            .catch(() => false)
    };

    useEffect(() => {
        if (needConfigData) {
            designConfigPersistence.getConfigData().then(configData => {
                setFontSize(configData.fontSize);
                setColorScheme(configData.colorScheme);
                setSelectedBackground(configData.background);
            });
            setNeedConfigData(false);
        }
    })

    //state variables and methods for layout page
    const initialWidgetList = [];
    const initialWidgetDataList = [];
    const [widgetList, setWidgetList] = React.useState(initialWidgetList);
    const [widgetDataList, setWidgetDataList] = React.useState(initialWidgetDataList);
    const [counter, setCounter] = useState(1);

    const [widgetListElement, setWidgetListElement] = React.useState({
        id:0,
        position:'',
        widgetNameText:'',
        widget: null,
        widgetData:null,
    });

    const [needInitialWidgetDataList, setNeedInitialWidgetDataList] = useState(true);  // only query initial data once

    useEffect(() => {
        if (needInitialWidgetDataList) {
            widgetPersistence.getWidgetDataList().then(list => {

                const newList = [];

                let c = 0;
                for (const widgetData of list) {
                    const widget = widgetLoader.getWidget(widgetData.widgetId);
                    newList.push({
                        id: c,
                        position: '',
                        widgetNameText: widget.getTitle(),
                        widget: widget,
                        widgetData: widgetData,
                    });
                    c++;
                }

                setNeedInitialWidgetDataList(false);
                setWidgetList(newList);
                setCounter(c);
            });
        }
    });

    const handleWidgetSelection = (event: SelectChangeEvent) => {
        const newWidget = widgetLoader.getWidget(event.target.value);
        const updatedValue = {
            id:counter,
            position:'',
            widgetNameText:event.target.value,
            widget: newWidget,
            widgetData: new WidgetData(event.target.value, -1, newWidget.isConfigurable() ? newWidget.getDefaultRawConfig() : {}),
        }
        setWidgetListElement(updatedValue)
    };

    const handleAddWidget = () => {
        if (widgetListElement.widget !== null) {
            const newWidget = {
                id:counter,
                position:'',
                widgetNameText:widgetListElement.widgetNameText,
                widget: widgetListElement.widget,
                widgetData: widgetListElement.widgetData,
            }
            setWidgetList(widgetList.concat(newWidget));
            incrementCounter();
        }
    };

    const incrementCounter = () => setCounter(counter + 1);

    const handleDeleteWidget = (id) => {
        setWidgetList(widgetList.filter(item => item.id !== id));
    };

    const handlePosition = (id, position) => {
        setWidgetList(widgetList.map((item) => {
            if (item.id === id) {
                const newWidgetData = new WidgetData(item.widgetData.widgetId, position, item.widgetData.rawConfig);
                return {...item, widgetData: newWidgetData}
            } else {
                return item;
            }
        }));
    };

    const handleRawConfigSave = (id, rawConfig) => {
        setWidgetList(widgetList.map(item => {
            if (item.id === id) {
                item.widgetData.rawConfig = rawConfig;
            }
            return item;
        }));
    };

    const handleLayoutChange = () => {
        const newWidgetDataList = widgetList.map(item => (
            item.widgetData
        ));
        setWidgetDataList(newWidgetDataList);
        widgetPersistence.setWidgetDataList(newWidgetDataList);
    };

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

    const handlePasswordChange = () => {
        return adminStatePersistence.setPassword(oldPassword, newPassword)
            .then(() => true)
            .catch(() => false)
        ;
    };

    //state variables and methods for announcements page
    const initialMailList = [];
    const [mailList, setMailList] = React.useState(initialMailList);
    const [needInitialVerUserList, setNeedInitialVerUserList] = React.useState(true);
    const [verUserListElement, setVerUserListElement] = React.useState({
        mail:'',
        name:'',
        verUser:null,
    });

    const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerUserListElement({...verUserListElement, mail:event.target.value});
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerUserListElement({...verUserListElement, name:event.target.value});
    };

    const handleAddMail = () => {
        const alreadyExists = mailList.some(item => verUserListElement.mail === item.mail);
        if (verUserListElement.name === '' && verUserListElement.mail === '') {
            return 2
        }
        if (!emailValidator.validate(verUserListElement.mail)) {
            return 0;
        }
        if (alreadyExists === true) {
            return 1;
        }
        if (verUserListElement.name !== '' && verUserListElement.mail !== '') {
            const newVerUser = new VerifiedUser(verUserListElement.mail, verUserListElement.name)
            const newUser = {
                mail: verUserListElement.mail,
                name: verUserListElement.name,
                verUser: newVerUser,
            };
            setMailList(mailList.concat(newUser));
            return 3;
        }
    };

    const handleDeleteUser = (listItem) => {
        setMailList(mailList.filter(item => item.mail !== listItem.mail));
    }

    const handleVerUserList = () => {
        const newList: VerifiedUser[] = mailList.map(item => item.verUser);
        announcementPersistence.setVerifiedUsers(newList)
            .then(() => console.log('VerUsers Saved'))
            .catch(reason => console.warn(`could not save verified users list: ${reason}`));
    }

    useEffect(() => {
        if (needInitialVerUserList) {
            announcementPersistence.getVerifiedUsers().then(list => {
                const newList = [];
                for (const verUser of list) {
                    newList.push({
                        mail:verUser.email,
                        name:verUser.name,
                        verUser:verUser,
                    })
                }
                setNeedInitialVerUserList(false);
                setMailList(newList);
            })
        }
    })

    //state variable for log out

    const handleLogout = () => {
        adminStatePersistence.logout()
            .then(() => {
                setLoggedInStatus(false);
                setLogInInput('');
            })
            .catch(() => {
                setLoggedInStatus(false);
                setLogInInput('');
            });
    };

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
                            <Grid item xs={2}>''</Grid>
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
                        <Tabs value={pageNumber} onChange={handleChange}>
                            <Tab label="Look"/>
                            <Tab label="Widgets"/>
                            <Tab label="Password"/>
                            <Tab label="Announcements"/>
                        </Tabs>
                    </Box>
                    <TabPanel value={pageNumber} index={0}>
                        <PersonalizationPage
                            colorScheme={colorScheme}
                            fontSize={fontSize}
                            handleColorSchemeChange={handleColorSchemeChange}
                            handleFontSizeChange={handleFontSizeChange}
                            selectedBackground={selectedBackground}
                            handleBackgroundSelect={url => setSelectedBackground(url)}
                            handlePersonalizationChange={handlePersonalizationChange}
                        >
                        </PersonalizationPage>

                    </TabPanel>
                    <TabPanel value={pageNumber} index={1}>
                        <LayoutPage
                            list={widgetList}
                            widgetListElement={widgetListElement}
                            handleWidgetSelection={(event) => handleWidgetSelection(event)}
                            handleAddWidget={handleAddWidget}
                            handleDeleteWidget={handleDeleteWidget}
                            handlePosition={handlePosition}
                            handleRawConfigSave={handleRawConfigSave}
                            handleLayoutChange={handleLayoutChange}
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
                        >
                        </AdminPage>
                    </TabPanel>
                    <TabPanel value={pageNumber} index={3}>
                        <AnnouncementsPage
                            mailList={mailList}
                            verUser={verUserListElement}
                            handleMailChange={handleMailChange}
                            handleNameChange={handleNameChange}
                            handleAddMail={handleAddMail}
                            handleDeleteUser={handleDeleteUser}
                            handleVerUserList={handleVerUserList}
                        >
                        </AnnouncementsPage>
                    </TabPanel>
                </div>
            );
        }
    }
    return renderConfigWebsite();
}