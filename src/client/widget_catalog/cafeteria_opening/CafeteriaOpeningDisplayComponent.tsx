import * as React from "react";
import * as CafeteriaOpeningConfig from "./CafeteriaOpening.json";
import axios from "axios"
import {DisplayComponent} from "../../widget/DisplayComponent";

interface CafeteriaOpeningState {
    dateCafeteria: Date,
    openDinningRightNow: boolean,
    timesDinning: Date[],
    openPizzaRightNow: boolean,
    timesPizza: Date[],
    openKoeriRightNow: boolean,
    timesKoeri: Date[]
    openCafeteriaRightNow: boolean,
    timesCafeteria: Date[],
    loadedDinning: boolean,
    loadedPizza: boolean,
    loadedKoeri: boolean,
    loadedCafeteria: boolean,
    loadedDiningOpen: boolean,
    loadedPizzaOpen: boolean,
    loadedKoeriOpen: boolean,
    loadedCafeteriaOpen: boolean,
    loadedDiningOpenDate: boolean,
    loadedOpen: boolean,
    openToday: boolean,
    openColor: string,
    closedColor: string,
}
const weekday = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

export class CafeteriaOpeningDisplayComponent extends DisplayComponent<any> {
    constructor(props) {
        super(props);
        this.state = {
            dateCafeteria: undefined,
            openDinningRightNow: false,
            timesDinning: [],
            openPizzaRightNow: false,
            timesPizza: [],
            openKoeriRightNow: false,
            timesKoeri: [],
            openCafeteriaRightNow: false,
            timesCafeteria: [],
            loadedDinning: false,
            loadedPizza: false,
            loadedKoeri: false,
            loadedCafeteria: false,

            loadedDiningOpen: false,
            loadedPizzaOpen: false,
            loadedKoeriOpen: false,
            loadedCafeteriaOpen: false,
            loadedDiningOpenDate: false,
            loadedOpen: false,

            openToday: false,
        };
    }

    componentDidMount() {
        this.setter();
        setInterval(() => this.setter(), CafeteriaOpeningConfig.REFRESH_RATE);
    }

    render() {
        return ((this.state.loadedDinning && this.state.loadedPizza && this.state.loadedKoeri && this.state.loadedCafeteria && this.state.loadedDiningOpen &&
            this.state.loadedPizzaOpen && this.state.loadedKoeriOpen && this.state.loadedCafeteriaOpen && this.state.loadedDiningOpenDate && this.state.loadedOpen) ?
            <div className="grid grid-flow-row sm:gap-1 lg:gap-2 xl:gap-3 4xl:gap-4 8xl:gap-5">
                <div
                    className="grid grid-flow-row sm:gap-1 lg:gap-2 xl:gap-3 4xl:gap-4 8xl:gap-5 items-center box-border h-fit font-light leading-normal
                    sm:text-xs md:text-sm lg:text-baselg xl:text-xl 2xl:text-1.5xl 4xl:text-3xl 8xl:text-4.5xl sm:text-left">
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>Dining Hall:
                        </div>
                        <div
                            className="font-light bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3"
                            style={{
                                backgroundColor: (this.state.openDinningRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                                borderRadius: "500px"
                            }}>
                            {(this.state.openDinningRightNow ? "open" : "closed")}
                        </div>until&nbsp;{(this.state.openDinningRightNow ? this.getTime(this.state.timesDinning[1]) : this.reformatDate(this.state.dateCafeteria) + " " + this.getTime(this.state.timesDinning[0]))}
                    </div>
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>Cafeteria:
                        </div>
                        <div
                            className="font-light bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3"
                            style={{
                                backgroundColor: (this.state.openCafeteriaRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                                borderRadius: "500px"
                            }}>
                            {(this.state.openCafeteriaRightNow ? "open" : "closed")}
                        </div>until&nbsp;{(this.state.openCafeteriaRightNow ? this.getTime(this.state.timesCafeteria[1]) : this.reformatDate(this.state.dateCafeteria) + " " + this.getTime(this.state.timesCafeteria[0]))}
                    </div>
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>[koeri]Werk:
                        </div>
                        <div
                            className="font-light bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3"
                            style={{
                                backgroundColor: (this.state.openKoeriRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                                borderRadius: "500px"
                            }}>
                            {(this.state.openKoeriRightNow ? "open" : "closed")}
                        </div>until&nbsp;{(this.state.openKoeriRightNow ? this.getTime(this.state.timesKoeri[1]) : this.reformatDate(this.state.dateCafeteria) + " " + this.getTime(this.state.timesKoeri[0]))}
                    </div>
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>[pizza]Werk:
                        </div>
                        <div
                            className="font-light bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3"
                            style={{
                                backgroundColor: (this.state.openPizzaRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                                borderRadius: "500px"
                            }}>
                            {(this.state.openPizzaRightNow ? "open" : "closed")}
                        </div>until&nbsp;{(this.state.openPizzaRightNow ? this.getTime(this.state.timesPizza[1]) : this.reformatDate(this.state.dateCafeteria) + " " + this.getTime(this.state.timesPizza[0]))}
                    </div>
                </div>
            </div> : <div/>)
    }

    private getDateOpening(url: string): Promise<Date> {
        const current = new Date();
        const currentDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
        const comparatorDate = new Date(0, 0, 0, current.getHours(), current.getMinutes(), current.getSeconds());
        return axios.get(CafeteriaOpeningConfig.URL_NEXT_MEAL).then(resp => {
            return this.getHourOpening(url).then(respOne => {
                if ((this.parseDate(resp.data[0].date).valueOf() === currentDay.valueOf() && comparatorDate < respOne[1]) || this.parseDate(resp.data[0].date).valueOf() > currentDay.valueOf()) {
                    return this.parseDate(resp.data[0].date);
                } else {
                    return this.parseDate(resp.data[1].date);
                }
            });

        });
    }

    private getHourOpening(url: string): Promise<Date[]> {
        return axios.get(url)
            .then(resp => {
                const unparsedString = resp.data.extratags.opening_hours;
                const array = [...unparsedString.matchAll('([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]')];
                if (array.length > 1) {
                    return [new Date(0, 0, 0, array[0][0].split(":")[0], array[0][0].split(":")[1]),
                        new Date(0, 0, 0, array[1][0].split(":")[0], array[1][0].split(":")[1])]
                } else {
                    throw new Error(`the caferteria opening times API is broken`);
                }
            });
    }

    private isOpen(url: string): Promise<boolean> {
        const current = new Date();
        const currentDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
        const hoursNow = new Date(0, 0, 0, current.getHours(), current.getMinutes())
        return this.getDateOpening(url).then(resp => {
            if (resp.valueOf() === currentDay.valueOf()) {
                return this.getHourOpening(url).then(respOne => {
                    return (respOne[0] < hoursNow && hoursNow < respOne[1]);
                });
            } else {
                return false;
            }
        });
    }

    private setter() {
        this.getHourOpening(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                timesDinning: resp,
            });
            this.setState({
                loadedDiningOpen: true,
            });
        });
        this.getDateOpening(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                dateCafeteria: resp,
            });
            this.setState({
                loadedDiningOpenDate: true,
            });
        });
        this.getHourOpening(CafeteriaOpeningConfig.URL_KOERI_OPENING_TIMES).then(resp => {
            this.setState({
                timesKoeri: resp,
            });
            this.setState({
                loadedKoeriOpen: true,
            });
        });
        this.getHourOpening(CafeteriaOpeningConfig.URL_PIZZA_OPENING_TIMES).then(resp => {
            this.setState({
                timesPizza: resp,
            })
            this.setState({
                loadedPizzaOpen: true,
            });
        });
        this.getHourOpening(CafeteriaOpeningConfig.URL_CAFETERIA_OPENING_TIMES).then(resp => {
            this.setState({
                timesCafeteria: resp,
            })
            this.setState({
                loadedCafeteriaOpen: true,
            });
        });
        this.openToday(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                openToday: resp,
            });
            this.setState({
                loadedOpen: true,
            });
        });
        this.isOpen(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                openDinningRightNow: resp,
            })
            this.setState({
                loadedDinning: true,
            });
        });
        this.isOpen(CafeteriaOpeningConfig.URL_PIZZA_OPENING_TIMES).then(resp => {
            this.setState({
                openPizzaRightNow: resp,
            });
            this.setState({
                loadedPizza: true,
            });
        });
        this.isOpen(CafeteriaOpeningConfig.URL_KOERI_OPENING_TIMES).then(resp => {
            this.setState({
                openKoeriRightNow: resp,
            });
            this.setState({
                loadedKoeri: true,
            });
        });
        this.isOpen(CafeteriaOpeningConfig.URL_CAFETERIA_OPENING_TIMES).then(resp => {
            this.setState({
                openCafeteriaRightNow: resp,
            });
            this.setState({
                loadedCafeteria: true,
            });
        });
    }

    private openToday(url: string): Promise<boolean> {
        const current = new Date();
        const currentDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
        const comparatorDate = new Date(0, 0, 0, current.getHours(), current.getMinutes(), current.getSeconds());
        return this.getDateOpening(url).then(respOne => {
            //check if current time is after closing time
            return this.getHourOpening(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
                return (respOne.valueOf() === currentDay.valueOf()) && comparatorDate < resp[1];
            });
        });
    }

    /**
     * assume that dateString is of format YYYY-MM-DD
     */
    private parseDate(dateString: string): Date {
        const [year, month, day] = dateString.split("-").map(numberString => parseInt(numberString));
        const date = new Date(year, month - 1, day);
        if (date.toString() === "Invalid Date") {
            throw Error(`could not parse Date from string "${dateString}".`);
        }
        return date;
    }

    private reformatDate(date: Date): string {
        try {
            return weekday[date.getDay()];
        } catch (e) {
            //ignore
        }
    }

    private getTime(date: Date) {
        return date.toLocaleTimeString("de", {hour: '2-digit', minute: '2-digit'});
    }
}