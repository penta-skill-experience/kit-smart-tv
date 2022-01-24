import * as React from "react";
import * as SquareHolderConfig from "./SquareHolder.json";
export class SquareHolder extends React.Component<any, any> {

    pageScroll = function() {
        document.getElementById(this.state.uniqueID).scrollBy(0,this.state.scroll); // horizontal and vertical scroll increments
        if((document.getElementById(this.state.uniqueID).scrollTop +
            document.getElementById(this.state.uniqueID).clientHeight) >=
            document.getElementById(this.state.uniqueID).scrollHeight || document.getElementById(this.state.uniqueID).scrollTop == 0) {
            this.state.scroll = -this.state.scroll;
        }
    }
    doesOverflow = function() {
        return document.getElementById(this.state.uniqueID).scrollHeight >= document.getElementById(this.state.uniqueID).clientHeight;
    }
    randomID = function() { //generate random ID to make scrolling behavior unique for each Squareholder
        let part = function() {
            return (Math.random().toString(10).substring(2));
        }
        return ("id" + part()+part()+part());
    };
    constructor(props) {
        super(props);
        this.state = {
            uniqueID: this.randomID(),
            hasError: false,
            error: undefined,
            scroll: SquareHolderConfig.SCROLL_SPEED
        };
        this.pageScroll = this.pageScroll.bind(this);
        setInterval(() => this.pageScroll(), 50);
        //(this.doesOverflow() ? setInterval(() => this.pageScroll(), 50):"");
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    render() {
        return <div className="w-fit" style={{
            height: "44vh"
        }}>
            <div className={"shadow-2xl rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md box-border"
                + (this.props.fill ? (this.props.darkTheme ? " bg-zinc-900" : " bg-neutral-100") : "")}>
                <div
                    className="sm:px-2 lg:px-3 xl:px-4 4xl:px-5 8xl:px-6 font-light leading-normal text-green-600 sm:text-base md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl 8xl:text-6xl">
                    {this.props.title}
                </div>
                <div
                    className={(this.props.subtitle == "" ? "sm:px-2 lg:px-3 xl:px-4 4xl:px-5 8xl:px-6 font-light leading-normal text-green-600 sm:text-sm lg:text-base xl:text-xl 2xl:text-2xl 8xl:text-3xl sm:pt-1 xl:pt-3 2xl:pt-6" : "")}>
                    {this.props.subTitle}
                </div>
                <div className={"sm:pl-5 sm:pt-1 sm:pb-2 sm:pr-2 xl:pl-8 xl:pr-5 xl:pb-4 4xl:pl-12 overflow-x-scroll scrollbar-hide scroll-smooth"}
                     id={this.state.uniqueID} style={{
                    maxHeight: "38vh",
                    scrollBehavior: "smooth"
                }}>
                    {this.state.hasError ?
                        // todo: make design for error message nicer
                        <p>Error while rendering widget: {this.state.error.message}</p>
                        : this.props.children  // only show children if they didn't produce an error
                    }
                    <div className="flex space-x-1 justify-center" style={{
                        opacity: 1
                    }}>
                        <a href="#"
                           className="rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                        </a>
                        <a href="#"
                           className="rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                        </a>
                        <a href="#"
                           className="rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                        </a>
                    </div>
                </div>
            </div>
        </div>;
    }
}