import * as React from "react";
import * as RotatorComponentConfig from "./RotatorComponent.json";

export class RotatorComponent extends React.Component<any, any> {

    pageSwitch = function() {
        this.setState({index: (this.state.index + 1)});
        if(this.state.index >= this.props.children.length) {
            this.setState({index: 0});
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.pageSwitch = this.pageSwitch.bind(this);
        setInterval(() => this.pageSwitch(), RotatorComponentConfig.SWITCH_SPEED);
    }

    render() {
        return <div>
            {React.Children.map(this.props.children, (child, i) =>
                <div>
                    {((this.state.index == i) ? child:"")}

                </div>
            )}
        </div>
    }
}