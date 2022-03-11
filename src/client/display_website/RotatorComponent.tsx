import * as React from "react";
import * as RotatorComponentConfig from "./RotatorComponent.json";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export class RotatorComponent extends React.Component<any, any> {

    private intervalHandle;

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }

    componentDidMount() {
        this.intervalHandle = setInterval(() => this.pageSwitch(), RotatorComponentConfig.SWITCH_SPEED);
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    render() {
        const multipleChildren = React.Children.count(this.props.children) > 1;
        return <div className="w-full h-full text-center">
            {
                multipleChildren ?
                    <Carousel showIndicators={true} showStatus={false} showArrows={false} autoPlay
                              showThumbs={false}
                              transitionTime={RotatorComponentConfig.SWITCH_SPEED}
                              interval={RotatorComponentConfig.SWITCH_RATE} infiniteLoop={true}
                              dynamicHeight={false}>
                        {
                            React.Children.map(this.props.children, child =>
                                <div>
                                    {child}
                                </div>)
                        }
                    </Carousel>
                    : <div>{this.props.children}</div>
            }
        </div>
    }

    private pageSwitch() {
        this.setState({
            index: (this.state.index + 1) % React.Children.count(this.props.children)
        });
    }
}