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

    pageScroll = function () {
        if (this.state.uniqueID === null || document.getElementById(this.state.uniqueID) === null) {
            return;
        }
        document.getElementById(this.state.uniqueID).scrollBy(0, this.state.scroll); // horizontal and vertical scroll increments
        if ((document.getElementById(this.state.uniqueID).scrollTop +
                document.getElementById(this.state.uniqueID).clientHeight) >=
            document.getElementById(this.state.uniqueID).scrollHeight || document.getElementById(this.state.uniqueID).scrollTop == 0) {
            this.state.scroll = -this.state.scroll;
        }
    }
    doesOverflow = function () {
        return document.getElementById(this.state.uniqueID).scrollHeight >= document.getElementById(this.state.uniqueID).clientHeight;
    }
    randomID = function () { //generate random ID to make scrolling behavior unique for each Squareholder
        let part = function () {
            return (Math.random().toString(10).substring(2));
        }
        return ("id" + part() + part() + part());
    };

    constructor(props) {
        super(props);
        this.state = {
            uniqueID: this.randomID(),
            hasError: false,
            error: undefined,
            scroll: SquareHolderConfig.SCROLL_SPEED
        };
        setInterval(() => this.pageScroll(), SquareHolderConfig.SCROLL_REFRESH);
        //(this.doesOverflow() ? setInterval(() => this.pageScroll(), 50):"");
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    render() {
        return <div className = "box-border" style={{
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
                    className={"sm:px-2 lg:px-3 xl:px-4 4xl:px-5 8xl:px-6 font-light leading-normal sm:text-base md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl 8xl:text-6xl"}
                    style={{
                        color: this.props.titleColor
                    }}>
                    {this.props.title}
                </div>
                <div
                    className={"w-full h-full sm:pl-5 sm:pt-1 sm:pb-2 sm:pr-2 xl:pl-8 xl:pr-5 xl:pb-4 4xl:pl-12 overflow-x-scroll scrollbar-hide scroll-smooth overflow-hidden"}
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