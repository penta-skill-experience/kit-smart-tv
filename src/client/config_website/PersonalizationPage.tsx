import * as React from "react";
import meme1 from './mem.jpg'
import meme2 from './mem2.jpg'
import {FormLabel, Grid} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from "@mui/material/Button";
import {DesignValuesPersistence} from "../../shared/persistence/DesignValuesPersistence";


//todo
//get from persistence
const designValuePersistence = new DesignValuesPersistence();
//                        = designValuePersistence.getBackgrounds(light);
const lightBackgroundList = [
    { img: meme1, id:'1', title:'bild1'},
    { img: meme1, id:'2', title:'bild2'},
    { img: meme1, id:'3', title:'bild3'},
    { img: meme1, id:'4', title:'bild4'},
    { img: meme1, id:'5', title:'bild5'},
    { img: meme1, id:'6', title:'bild6'},
];

//                        = designValuePersistence.getBackgrounds(dark);
const darkBackgroundList = [
    { img: meme2, id:'1', title:'bild1'},
    { img: meme2, id:'2', title:'bild2'},
    { img: meme2, id:'3', title:'bild3'},
    { img: meme2, id:'4', title:'bild4'},
    { img: meme2, id:'5', title:'bild5'},
    { img: meme2, id:'6', title:'bild6'},
];

export const PersonalizationPage= ({colorScheme, fontSize, handleColorSchemeChange, handleFontSizeChange,
                                       selectedLightImage, selectedDarkImage, handleLightImageSelect,
                                       handleDarkImageSelect, handlePersonalizationChange, children}) => {

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
                    {renderBackgroundImages({
                        colorScheme:colorScheme,
                        selectedLightImage:selectedLightImage,
                        selectedDarkImage:selectedDarkImage,
                        handleLightImageSelect:handleLightImageSelect,
                        handleDarkImageSelect:handleDarkImageSelect,
                    })}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handlePersonalizationChange}
                        variant="outlined"
                    >
                        Save Changes</Button>
                </Grid>
            </Grid>
        </div>
    );
};

function renderBackgroundImages({colorScheme, selectedLightImage, selectedDarkImage, handleLightImageSelect, handleDarkImageSelect}) {

    if (colorScheme === "light") {
        return (
            <div>
                <h1>Available backgrounds for light mode:</h1>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {lightBackgroundList.map((item) => (
                        <div>
                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                                <Grid item>
                                    <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            loading="lazy"
                                            alt={item.title}
                                        />
                                    </ImageListItem>
                                </Grid>
                                <Grid item>
                                    <Radio
                                        checked={selectedLightImage === item.id}
                                        onChange={handleLightImageSelect}
                                        value={item.id}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </ImageList>
            </div>
        );
    } else if (colorScheme === "dark") {
        return (
            <div>
                <h1>Available backgrounds for dark mode:</h1>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {darkBackgroundList.map((item) => (
                        <div>
                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                                <Grid item>
                                    <img
                                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        loading="lazy"
                                        alt={item.title}
                                    />
                                </Grid>
                                <Grid item>
                                    <Radio
                                        checked={selectedDarkImage === item.id}
                                        onChange={handleDarkImageSelect}
                                        value={item.id}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </ImageList>
            </div>
        );
    } else {
        return
    }
}