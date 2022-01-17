import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import meme1 from './mem.jpg'
import meme2 from './mem2.jpg'
import {useState} from "react";



export const PersonalizationPage= ({colorScheme, fontSize, handleColorSchemeChange, handleFontSizeChange, children}) => {

    return (
        <>
            <ToggleButtonGroup
                value = {colorScheme}
                exclusive
                onChange = {handleColorSchemeChange}
            >
                <h1>Choose your color scheme:</h1>
                <h1>light mode:</h1>
                <ToggleButton value="light">
                    <Brightness7Icon/>
                </ToggleButton>
                <h1>dark mode:</h1>
                <ToggleButton value="dark">
                    <Brightness4Icon/>
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
                value = {fontSize}
                exclusive
                onChange = {handleFontSizeChange}
            >
                <h1>Choose your preferred font size:</h1>
                    <h1>Small:</h1>
                    <ToggleButton value = "small">
                        <RadioButtonCheckedIcon/>
                    </ToggleButton>
                    <h1>Medium:</h1>
                    <ToggleButton value = "medium">
                        <RadioButtonCheckedIcon/>
                    </ToggleButton>
                    <h1>Large:</h1>
                    <ToggleButton value = "large">
                        <RadioButtonCheckedIcon/>
                    </ToggleButton>
            </ToggleButtonGroup>
            {renderBackground(colorScheme)}
        </>
    );
};

function renderBackground(colorScheme) {
    if (colorScheme === "light") {
        return <div>
            <h1>Available backgrounds for light mode:</h1>
            <img src={meme1}/>
        </div>

    } else if (colorScheme === "dark") {
        return <div>
            <h1>Available backgrounds for dark mode:</h1>
            <img src={meme2}/>
        </div>
    } else {
        return
    }
}