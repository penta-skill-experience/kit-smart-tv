import * as React from "react";
import * as RotatorComponentConfig from "./RotatorComponent.json";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export class RotatorComponent extends React.Component<any, any> {

    private pageSwitch() {
        const newIndex = (this.state.index + 1) % React.Children.count(this.props.children);
        this.setState({index: newIndex});
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
        setInterval(() => this.pageSwitch(), RotatorComponentConfig.SWITCH_SPEED);
    }

    render() {
        return <div className="w-full h-full">
            <Carousel showIndicators={React.Children.count(this.props.children) > 1} showStatus={false} showArrows={false} autoPlay showThumbs={false} transitionTime={RotatorComponentConfig.SWITCH_SPEED} interval={RotatorComponentConfig.SWITCH_RATE} infiniteLoop={true} dynamicHeight={true}>
                {
                    React.Children.map(this.props.children, child =>
                        <div>
                            {child}
                        </div>)
                }
            </Carousel>
        </div>
    }
}