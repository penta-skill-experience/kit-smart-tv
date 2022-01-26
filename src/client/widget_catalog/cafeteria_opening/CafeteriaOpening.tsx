import * as React from "react";
import * as CafeteriaOpeningConfig from "./CafeteriaOpening.json";
import axios from "axios"

interface CafeteriaOpeningState {
    dateCafeteria: string;

    openToday: boolean;
    openRightNow: boolean;

    openingTime: string;
    closingTime: string;
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
                    className="grid grid-flow-col font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                    <div>
                        <div>Dining Hall:</div>
                        <div>[koeri]Werk:</div>
                        <div>[pizza+pasta]Werk:</div>
                        <div>Cafeteria:</div>
                    </div>
                    <div>
                        {(this.state.openRightNow ?
                            <div>
                                open until
                                <div>{this.state.closingTime}</div>
                            </div> :
                            <div>
                                closed
                                until <div>{this.state.openingTime} {(this.state.openToday) ? " today" : " on " + this.state.dateCafeteria}</div>
                            </div>)
                        }
                    </div>
                </div>
            }
        </div>;
    }
}