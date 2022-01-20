import * as React from "react";
import meme1 from './mem.jpg'
import meme2 from './mem2.jpg'
import {FormLabel, Grid} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export const PersonalizationPage= ({colorScheme, fontSize, handleColorSchemeChange, handleFontSizeChange, children}) => {

    return (
        <div>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Choose your color scheme:</FormLabel>
                        <RadioGroup onChange={handleColorSchemeChange} value={colorScheme}>
                            <FormControlLabel value="light" control={<Radio />} label="light mode" />
                            <FormControlLabel value="dark" control={<Radio />} label="dark mode" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Choose your preferred font size:</FormLabel>
                        <RadioGroup onChange={handleFontSizeChange} value={fontSize}>
                            <FormControlLabel value="small" control={<Radio />} label="small" />
                            <FormControlLabel value="medium" control={<Radio />} label="medium" />
                            <FormControlLabel value="large" control={<Radio />} label="large" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {renderBackground(colorScheme)}
                </Grid>
            </Grid>
        </div>
    );
};

function renderBackground(colorScheme) {
    if (colorScheme === "light") {
        return (
            <div>
                <h1>Available backgrounds for light mode:</h1>
                <img src={meme1}/>
            </div>
        );

    } else if (colorScheme === "dark") {
        return (
            <div>
                <h1>Available backgrounds for dark mode:</h1>
                <img src={meme2}/>
            </div>
        );
    } else {
        return
    }
}