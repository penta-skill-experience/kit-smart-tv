
import * as React from "react";
import meme1 from './mem.jpg';
import meme2 from './mem2.jpg';
import meme3 from './mem3.jpg';

export class LogInPage extends React.Component{
    state ={
        password: ""
    };

    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event){
        this.setState({password: event.target.value})
    }

    handleLogIn(){
        // to do
        // connect with persistence
        alert('A password was submitted: ' + this.state.password);
    }

    render(){
        return <div className="md:container md:mx-auto">
            <h1 className="text-7xl">Log In Admin Interface</h1>
            <form onSubmit={this.handleLogIn}>
                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.handleInput} />
                </label>
            </form>
            <button onClick={this.handleLogIn}>Log In</button>
        </div>
    }
}

export class PersonalizationPage extends React.Component{
    state = {
        color_scheme: "light",
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
                <input type="checkbox" onChange= {this.handleChosenColorScheme} defaultChecked={true}/>
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
        if (this.state.color_scheme === "light"){
            return <div>
                <h1>Available backgrounds for mode:</h1>
                <img src={meme1}/>
            </div>

        } else if (this.state.color_scheme === "dark") {
            return <div>
                <h1>Available backgrounds for dark mode:</h1>
                <img src={meme2}/>
            </div>
        } else {
            return
        }
    }
}
