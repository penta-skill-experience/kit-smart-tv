import * as React from "react";
import meme1 from "./mem.jpg";
import meme2 from "./mem2.jpg";

export class PersonalizationPage extends React.Component{
    state = {
        light_scheme: false,
        dark_scheme: false,
        font_size:"medium"
    }

    constructor(props) {
        super(props);
        this.handleChosenColorScheme = this.handleChosenColorScheme.bind(this);
    }

    handleChosenColorScheme(event){
        alert('checkbos clicked' + event.target.checked)

        //this.setState({color_scheme: event.target.checked})
    }

    render() {
        return <div className="gap-5 columns-2">
            <h1>Choose your color scheme:</h1>
            <label>
                Light(default):
                <input type="checkbox" onChange= {this.handleChosenColorScheme}/>
                Dark:
                <input type="checkbox" onChange= {this.handleChosenColorScheme}/>
            </label>

            <h1>Choose your preferred font size:</h1>

            <label>
                Small:
                <input type="checkbox" />
                Medium(default):
                <input type="checkbox" defaultChecked={true}/>
                Large:
                <input type="checkbox"/>
            </label>
            {this.renderBackgrounds()}
        </div>
    }

    renderBackgrounds(){
        if (this.state.light_scheme === true){
            return <div>
                <h1>Available backgrounds for mode:</h1>
                <img src={meme1}/>
            </div>

        } else if (this.state.dark_scheme === true) {
            return <div>
                <h1>Available backgrounds for dark mode:</h1>
                <img src={meme2}/>
            </div>
        } else {
            return
        }
    }
}
