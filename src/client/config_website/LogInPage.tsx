import * as React from "react";

export class LogInPage extends React.Component {
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