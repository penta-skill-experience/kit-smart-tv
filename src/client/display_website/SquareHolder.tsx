import * as React from "react";
import * as SquareHolderConfig from "./SquareHolder.json";
import "./SquareHolder.css";
import {DisplayComponent} from "../widget/DisplayComponent";
import $ from 'jquery';
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
    uniqueIdInsideScroll: any,
    uniqueIdOutsideScroll: any,
    hasError: boolean;
    errorMessage: string;
    scroll: number;
}

export class SquareHolder extends React.Component<SquareHolderProps, SquareHolderState> {

    private pageScrollToTop = function() {
        $("body,html, #" + this.state.uniqueIdOutsideScroll).animate({ scrollTop: 0}, 5000);
    }
    private pageScrollToBottom = function() {
        $("body,html, #"+this.state.uniqueIdOutsideScroll).animate({ scrollTop: document.getElementById(this.state.uniqueIdInsideScroll).scrollHeight - document.getElementById(this.state.uniqueIdOutsideScroll).clientHeight}, 5000);
    }
    private randomID = function () { //generate random ID to make scrolling behavior unique for each Squareholder
        let part = function () {
            return (Math.random().toString(10).substring(2));
        }
        return ("id" + part() + part() + part());
    };

    private clearErrorIntervalHandle;

    constructor(props) {
        super(props);
        this.state = {
            uniqueIdOutsideScroll: this.randomID(),
            uniqueIdInsideScroll: this.randomID(),
            hasError: false,
            errorMessage: undefined,
            scroll: SquareHolderConfig.SCROLL_SPEED
        };
    }

    componentDidMount(): void {
        this.clearErrorIntervalHandle = setInterval(() => this.clearError(), 5000);
        this.pageScrollToBottom();
        this.pageScrollToTop();
        setInterval(() => {
            this.pageScrollToBottom();
            this.pageScrollToTop();
        },10000);
    }

    componentWillUnmount(): void {
        clearInterval(this.clearErrorIntervalHandle);
    }

    private clearError(): void {
        this.setState({
            hasError: false,
        });
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            errorMessage: error.message,
        };
    }

    renderErrorMessage(): JSX.Element {
        return <div
            className="font-light leading-normal sm:text-xs lg:text-sm xl:text-base 2xl:text-lg 4xl:text-xl text-center">
            <div className="xs:w-10 sm:w-12 md:w-14 base:w-18 lg:w-24 xl:w-35 2xl:w-43 4xl:w-50 8xl:w-60">
                <div/>
                <img alt="Error_Robot" src="https://upload.wikimedia.org/wikipedia/commons/2/24/094-robot-face-3.svg"/>
                <div/>
            </div>
        <span className="text-left">Render error: {this.state.errorMessage}</span>
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
                <div className="sm:pl-5 sm:pt-1 sm:pb-2 sm:pr-2 xl:pl-8 xl:pr-5 xl:pb-4 4xl:pl-12" id={this.state.uniqueIdOutsideScroll} style={{
                    height: "35vh",
                    overflow: "scroll"
                }}>
                    <div id={this.state.uniqueIdInsideScroll}>
                        {content}
                    </div>
                </div>
            </div>
        </div>;
    }
}