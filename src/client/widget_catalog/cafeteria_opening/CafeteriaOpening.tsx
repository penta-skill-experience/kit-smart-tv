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

            openColor: "lightseagreen",
            closedColor: "tomato",
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
                            if ((date === respOne.data[0].date) && (openingTime > hours)) {
                                this.setState({
                                    openRightNow: false,
                                    openToday: false,
                                    dateCafeteria: respOne.data[0].date
                                });
                            }else {
                                this.setState({
                                    openRightNow: false,
                                    openToday: false,
                                    dateCafeteria: respOne.data[1].date
                                });
                            }

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
            <div
                className="grid grid-flow-row lg:gap-3 xl:gap-4 4xl:gap-6 8xl:gap-8 font-light leading-normal sm:text-xs md:text-sm lg:text-base lg:text-xl 2xl:text-2xl 4xl:text-4xl 8xl:text-5xl sm:text-left">
                <div>
                    <div className="flex gap-3 box-border items-center">
                        <div>Dining Hall:&nbsp;
                        </div>
                        <div className="font-medium sm:w-3 lg:w-5 xl:w-8 4xl:w-12 8xl:w-15 sm:h-3 lg:h-5 xl:h-8 4xl:h-12 8xl:h-15 rounded-full items-center justify-center" style={{
                            backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                        }}/>
                    </div>
                    <div className="flex gap-3 box-border items-center">
                        <div>[koeri]Werk:&nbsp;
                        </div>
                        <div className="font-medium sm:w-3 lg:w-5 xl:w-8 4xl:w-12 8xl:w-15 sm:h-3 lg:h-5 xl:h-8 4xl:h-12 8xl:h-15 rounded-full items-center justify-center" style={{
                            backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                        }}/>
                    </div>
                    <div className="flex gap-3 box-border items-center">
                        <div>[pizza+pasta]Werk:&nbsp;
                        </div>
                        <div className="font-medium sm:w-3 lg:w-5 xl:w-8 4xl:w-12 8xl:w-15 sm:h-3 lg:h-5 xl:h-8 4xl:h-12 8xl:h-15 rounded-full items-center justify-center" style={{
                            backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                        }}/>
                    </div>
                    <div className="flex gap-3 box-border items-center">
                        <div>Cafeteria:&nbsp;
                        </div>
                        <div className="font-medium sm:w-3 lg:w-5 xl:w-8 4xl:w-12 8xl:w-15 sm:h-3 lg:h-5 xl:h-8 4xl:h-12 8xl:h-15 rounded-full items-center justify-center" style={{
                            backgroundColor: (this.state.openRightNow ? this.state.openColor : this.state.closedColor),
                        }}/>
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
        </div>;
    }
}