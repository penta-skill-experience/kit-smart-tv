import * as React from "react";
import * as SquareHolderConfig from "./SquareHolder.json";
import "./SquareHolder.css";

interface SquareHolderProps {
    title: string;
    titleColor: string;
    accentColor: string;
    specialBoldFontColor: string;
    specialSubtleFontColor: string;
}

export class SquareHolder extends React.Component<SquareHolderProps, any> {

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
            error: undefined,
            scroll: SquareHolderConfig.SCROLL_SPEED
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    render() {
        return <div style={{
            height: "45.5vh",
            width: "30.75vw",
        }}>
            <div className={"w-full h-full rounded-2xl"} id="squareHeld" style={{
                backgroundColor: this.props.accentColor
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
                    {this.state.hasError ?
                        // todo: make design for error message nicer
                        <p>Error while rendering widget: {this.state.error.message}</p>
                        : this.props.children  // only show children if they didn't produce an error
                    }
                </div>
            </div>
        </div>;
    }
}