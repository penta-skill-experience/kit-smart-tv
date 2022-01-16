import Typography from '@mui/material/Typography';
import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {PersonalizationPage} from "./PersonalizationPage";
import {LayoutPage} from "./LayoutPage";
import {AdminPasswordPage} from "./AdminPasswordPage";


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
    const [pageNumber, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={pageNumber} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Personalization"/>
                    <Tab label="Layout"/>
                    <Tab label="Admin"/>
                </Tabs>
            </Box>
            <TabPanel value={pageNumber} index={0}>
                <PersonalizationPage/>
            </TabPanel>
            <TabPanel value={pageNumber} index={1}>
                <LayoutPage/>
            </TabPanel>
            <TabPanel value={pageNumber} index={2}>
                <AdminPasswordPage/>
            </TabPanel>
        </div>
    );
}



