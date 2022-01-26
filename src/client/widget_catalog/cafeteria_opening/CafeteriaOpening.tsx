import * as React from "react";
import * as CafeteriaOpeningConfig from "./CafeteriaOpening.json";
import axios from "axios"

interface CafeteriaOpeningState {
    dateCafeteria: string;

    openToday: boolean;
    openRightNow: boolean;

    openingTime: string;
    closingTime: string;
    openColor: string; //make sure so pass these down from above
    closedColor: string;
}

export class CafeteriaOpening extends React.Component<any, CafeteriaOpeningState> {
    constructor(props) {
        super(props);
        this.state = {
            dateCafeteria: "",

            openToday: false,
            openRightNow: false,

            openingTime: "",
            closingTime: "",

            openColor: "green",
            closedColor: "black",
        };
    }

    getDate() {
        axios.get(CafeteriaOpeningConfig.URL_NEXT_MEAL)
            .then(respOne => {
                const year = new Date().getFullYear();
                const day = new Date().getDate();
                const month = new Date().getMonth() + 1;
                const date = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
                axios.get(CafeteriaOpeningConfig.URL_OPENING_TIMES)
                    .then(resp => {
                        const hours = new Date();
                        const unparsedString = resp.data.extratags.opening_hours;
                        const array = [...unparsedString.matchAll('([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]')];
                        let openingTime = new Date();
                        let closingTime = new Date();
                        if (array.length > 1) {
                            openingTime.setHours(array[0][0].split(":")[0]);
                            openingTime.setMinutes(array[0][0].split(":")[1]);
                            closingTime.setHours(array[1][0].split(":")[0]);
                            closingTime.setMinutes(array[1][0].split(":")[1]);
                        } else {
                            throw new Error(`the caferteria opening times API is broken`);
                            return;
                        }
                        if ((date === respOne.data[0].date) && (openingTime < hours && hours < closingTime)) {
                            this.setState({
                                openRightNow: true,
                                openToday: true,
                                dateCafeteria: respOne.data[0].date
                            });
                        } else {
                            this.setState({
                                openRightNow: false,
                                openToday: false,
                                dateCafeteria: respOne.data[1].date
                            });
                        }

                        this.setState({
                            openingTime: openingTime.toLocaleTimeString(navigator.language, {
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            closingTime: closingTime.toLocaleTimeString(navigator.language, {
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getDate();
        setInterval(() => this.getDate(), CafeteriaOpeningConfig.REFRESH_RATE);
    }

    render() {
        return <div className="grid grid-flow-row sm:g-0.5 xl:gap-1.5 2xl:gap-2 items-center box-border h-fit">
            {
                <div
                    className="grid grid-flow-row lg:gap-3 xl:gap-4 4xl:gap-6 8xl:gap-8 font-light leading-normal sm:text-xs md:text-sm lg:text-base lg:text-xl 2xl:text-2xl 4xl:text-4xl 8xl:text-5xl sm:text-left">
                    <div>
                        <div>Dining Hall:&nbsp;
                            <span className="font-medium py-1 px-2 rounded-full" style={{
                                backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                            }}>{(this.state.openRightNow ? "open" : "closed")}</span>
                        </div>
                        <div>[koeri]Werk:&nbsp;
                            <span className="font-medium py-1 px-2 rounded-full" style={{
                                backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                            }}>{(this.state.openRightNow ? "open" : "closed")}</span>
                        </div>
                        <div>[pizza+pasta]Werk:&nbsp;
                            <span className="font-medium py-1 px-2 rounded-full" style={{
                                backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                            }}>{(this.state.openRightNow ? "open" : "closed")}</span>
                        </div>
                        <div>Cafeteria:&nbsp;
                            <span className="font-medium py-1 px-2 rounded-full" style={{
                                backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                            }}>{(this.state.openRightNow ? "open" : "closed")}</span>
                        </div>
                    </div>
                    <div>
                        {(this.state.openRightNow ?
                            <div>
                                until:{this.state.closingTime}
                            </div> :
                            <div>
                                reopens: {this.state.openingTime} {(this.state.openToday) ? " today" : " on " + this.state.dateCafeteria}
                            </div>)
                        }
                    </div>
                </div>
            }
        </div>;
    }
}