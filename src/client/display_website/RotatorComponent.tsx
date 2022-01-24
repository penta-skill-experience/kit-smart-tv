import * as React from "react";
import * as RotatorComponentConfig from "./RotatorComponent.json";

export class RotatorComponent extends React.Component<any, any> {
    setLength = function () {
        this.state.elements = this.props.children.length;
    }
    pageSwitch = function () {
        this.setState({index: (this.state.index + 1)});
        if (this.state.index >= this.state.elements) {
            this.setState({index: 0});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            elements: 0
        };
        this.setLength();
        this.pageSwitch = this.pageSwitch.bind(this);
        setInterval(() => this.pageSwitch(), RotatorComponentConfig.SWITCH_SPEED);
    }

    render() {
        return <div className="w-fit" style={{
            height: "44vh"
        }}>
            {React.Children.map(this.props.children, (child, i) =>
                <div>
                    {((this.state.index == i) ? child : "")}
                </div>
            )}
            {(this.state.elements > 1 && this.state.elements < RotatorComponentConfig.MAXIMUM_DOTS) ?
                <div className="flex justify-center"> {React.Children.map(this.props.children, (child, k) =>
                    <a href="#"
                       className={"w-4 h-4 rounded-full rounded-md " + ((this.state.index == k) ? "bg-gray-900" : "bg-gray-500")}>
                    </a>
                )}
                </div>
                : ""}
        </div>
    }
}