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
import {AnnouncementsPage} from "./AnnouncementsPage";
import * as emailValidator from "email-validator";
import {DesignConfigPersistence} from "../../shared/persistence/DesignConfigPersistence";
import {WidgetLoader} from "../widget/WidgetLoader";
import {WidgetData} from "../widget/WidgetData";
import {WidgetPersistence} from "../../shared/persistence/WidgetPersistence";
import {VerifiedUser} from "../../shared/values/VerifiedUser";
import {AnnouncementPersistence} from "../../shared/persistence/AnnouncementPersistence";
import {AdminStatePersistence} from "../../shared/persistence/AdminStatePersistence";
import {TokenHolderSingleton} from "../../shared/persistence/TokenHolderSingleton";


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
const announcementPersistence = new AnnouncementPersistence();
const adminStatePersistence = new AdminStatePersistence();

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
        /*if (logInInput === password) {
            setLoggedInStatus(true);
        } else {
            alert('password not correct')
        }*/
        adminStatePersistence.login(logInInput).then(() => {setLoggedInStatus(true);}).catch();
    };

    const handleClickShowPassword = () => {
        setVisible(!visible)
    };

    //state variables and methods for tabs
    const [pageNumber, setPageNumber] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPageNumber(newValue);
    };

    //state variables and methods for personalization page
    const [colorScheme,setColorScheme] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState<string | null>(null);
    const [selectedLightImage, setSelectedLightImage] = React.useState('');
    const [selectedDarkImage, setSelectedDarkImage] = React.useState('');

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

    const handleLightImageSelect = (event) => {
        setSelectedLightImage(event.target.value);
    };

    const handleDarkImageSelect = (event) => {
        setSelectedDarkImage(event.target.value);
    };

    const handlePersonalizationChange = () => {
        if (colorScheme === null || fontSize === null) {
            alert('Color scheme and font size must be chosen')
            return;
        }
        alert('Changes saved')
        designConfigPersistence.setSelectedColorSchemeId(colorScheme);
        designConfigPersistence.setSelectedFontSize(fontSize);
        //todo
        //designConfigPersistence.setSelectedBackground();
    };

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

    const handleWidgetSelection = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        //todo
        //config is not always true
        const newWidget = widgetLoader.getWidget(event.target.value);
        const updatedValue = {
            id:counter,
            position:'',
            widgetNameText:event.target.value,
            widget: newWidget,
            widgetData: new WidgetData(event.target.value, -1, null),
        }
        setWidgetListElement(updatedValue)
    };

    const handleAddWidget = () => {
        if (widgetListElement.widget !== null) {
            const newWidget = {
                //todo
                //config is not always true
                id:counter,
                position:'',
                widgetNameText:widgetListElement.widgetNameText,
                widget: widgetListElement.widget,
                widgetData: widgetListElement.widgetData,
            }
            setWidgetList(widgetList.concat(newWidget));
            incrementCounter();
            console.log('Widget ' + newWidget.widget.getTitle() + ' with id ' + newWidget.id + ' and widget id ' + newWidget.widgetData.widgetId)
        }
    };

    const incrementCounter = () => setCounter(counter + 1);

    const handleDeleteWidget = (id) => {
        console.log('Widget with id ' + id + ' is removed ')
        setWidgetList(widgetList.filter(item => item.id !== id));
    };

    const handlePosition = (id, position) => {
        const newList = widgetList.map((item) => {
            if (item.id === id) {
                const newWidgetData = new WidgetData(item.widgetData.widgetId, position, null)
                const newWidget = { ...item, widgetData: newWidgetData}
                //todo
                //remove
                console.log('Position of Widget ' + newWidget.widget.getTitle() + 'changed to position ' + newWidget.widgetData.location)
                return newWidget;
            } else {
                return item;
            }
        });
        setWidgetList(newList);
    };

    const handleLayoutChange = () => {
        const newWidgetDataList = widgetList.map(item => (
            item.widgetData
        ));
        setWidgetDataList(newWidgetDataList);
        console.log(newWidgetDataList[0]);
        console.log(newWidgetDataList[1]);
        console.log(newWidgetDataList[2]);
        console.log(newWidgetDataList[3]);
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

    //todo
    //Connect with persistence
    const handlePasswordChange = () => {
        adminStatePersistence.setPassword(oldPassword, newPassword).then(() => {alert('Password saved')});
    };

    //state variables and methods for announcements page
    const initialMailList = [];
    const [mailList, setMailList] = React.useState(initialMailList);
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
        if (!emailValidator.validate(verUserListElement.mail)) {
            alert('E-Mail does not exist')
            return;
        }
        if (alreadyExists === true) {
            alert('This E-Mail already exists')
            return;
        }
        if (verUserListElement.name !== '' && verUserListElement.mail !== '') {
            const newVerUser = new VerifiedUser(verUserListElement.mail, verUserListElement.name)
            const newUser = {
                mail:verUserListElement.mail,
                name:verUserListElement.name,
                verUser: newVerUser,
            }
            setMailList(mailList.concat(newUser));
            announcementPersistence.addVerifiedUser(newUser.verUser);
            return;
        }
        alert('Username and email have to be filled out')
    };

    const handleDeleteUser = (listItem) => {
        setMailList(mailList.filter(item => item.mail !== listItem.mail));
        announcementPersistence.removeVerifiedUser(listItem.verUser);
    }

    //state variable for log out

    const handleLogout = () => {
        adminStatePersistence.logout().then(() => console.log(TokenHolderSingleton.instance.accessToken));
        setLoggedInStatus(false);
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
                            <Tab label="Personalization"/>
                            <Tab label="Layout"/>
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
                            selectedLightImage={selectedLightImage}
                            selectedDarkImage={selectedDarkImage}
                            handleLightImageSelect={handleLightImageSelect}
                            handleDarkImageSelect={handleDarkImageSelect}
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
                        >
                        </AnnouncementsPage>
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