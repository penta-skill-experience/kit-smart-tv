import * as React from "react";
import * as SquareHolderConfig from "./SquareHolder.json";
import "./SquareHolder.css";
import {DisplayComponent} from "../widget/DisplayComponent";

interface SquareHolderProps {

    /**
     * The class of the DisplayComponent that should be instantiated as child inside this component.
     */
    displayComponentClass?: typeof DisplayComponent;
    rawConfig?: Object;

    title: string;
    titleColor: string;
    accentColor: string;
    specialBoldFontColor: string;
    specialSubtleFontColor: string;
}

interface SquareHolderState {
    uniqueID: any;
    hasError: boolean;
    errorMessage: string;
    scroll: number;
}

export class SquareHolder extends React.Component<SquareHolderProps, SquareHolderState> {

    randomID = function () { //generate random ID to make scrolling behavior unique for each Squareholder
        let part = function () {
            return (Math.random().toString(10).substring(2));
        }
        return ("id" + part() + part() + part());
    };

    doesOverflow = function () {
        return document.getElementById(this.state.uniqueID).scrollHeight >= document.getElementById(this.state.uniqueID).clientHeight;
    }

    constructor(props) {
        super(props);
        this.state = {
            uniqueID: this.randomID(),
            hasError: false,
            errorMessage: undefined,
            scroll: SquareHolderConfig.SCROLL_SPEED
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage: error.message,
        };
    }

    renderErrorMessage(): JSX.Element {
        return <div className={"font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl"}>
            Render error: {this.state.errorMessage}
        </div>;
    }

    render() {

        // only show widget if it didn't produce an error, otherwise show error message
        let content = undefined;
        if (this.state.hasError) {
            content = this.renderErrorMessage();
        } else {
            if (this.props.displayComponentClass) {
                // @ts-ignore
                content = React.createElement(this.props.displayComponentClass, {
                    error: msg => this.setState({hasError: true, errorMessage: msg}),
                    config: this.props.rawConfig
                }, null);
            }
        }

        return <div className="box-border" style={{
            height: "45vh",
            width: "31vw",
            boxSizing: "border-box"
        }}>
            <div className={"w-full h-full shadow-2xl rounded-2xl"} id="squareHeld" style={{
                backgroundColor: this.props.accentColor,
                boxSizing: "border-box",
                overflow: "hidden"
            }}>
                <div
                    className={"sm:px-2 lg:px-3 xl:px-4 4xl:px-5 8xl:px-6 font-light leading-loose sm:text-base md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl 8xl:text-6xl"}
                    style={{
                        color: this.props.titleColor
                    }}>
                    {this.props.title}
                </div>
                <div
                    className={"w-full h-full sm:pl-5 sm:pt-1 sm:pb-2 sm:pr-2 xl:pl-8 xl:pr-5 xl:pb-4 4xl:pl-12 scrollbar-hide"}
                    id={this.state.uniqueID} style={{
                    scrollBehavior: "smooth"
                }}>
                    {content}
                </div>
            </div>
        </div>;
    }
}