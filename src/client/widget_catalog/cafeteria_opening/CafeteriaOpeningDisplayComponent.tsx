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
    openToday: boolean,
    openColor: string,
    closedColor: string,
}

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

            openToday: false,
        };
    }
    private getDateOpening(url: string): Promise<Date>{
        const current = new Date();
        const currentDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
        const comparatorDate = new Date(0,0,0,current.getHours(), current.getMinutes(), current.getSeconds());
        return axios.get(CafeteriaOpeningConfig.URL_NEXT_MEAL).then(resp => {
                return this.getHourOpening(url).then(respOne => {
                    if((this.parseDate(resp.data[0].date).valueOf() === currentDay.valueOf() && comparatorDate < respOne[1]) || this.parseDate(resp.data[0].date).valueOf() > currentDay.valueOf()){
                        return this.parseDate(resp.data[0].date);
                    }else{
                        return this.parseDate(resp.data[1].date);
                    }
                        });

            });
    }
    private getHourOpening(url: string): Promise<Date[]>{
        return axios.get(url)
            .then(resp => {
                const unparsedString = resp.data.extratags.opening_hours;
                const array = [...unparsedString.matchAll('([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]')];
                if (array.length > 1) {
                    return [new Date(0,0,0, array[0][0].split(":")[0], array[0][0].split(":")[1]),
                        new Date(0,0,0, array[1][0].split(":")[0], array[1][0].split(":")[1])]
                } else {
                    throw new Error(`the caferteria opening times API is broken`);
                }
            });
    }
    private isOpen(url: string): Promise<boolean> {
        const current = new Date();
        const currentDay = new Date(current.getFullYear(), current.getMonth(), current.getDate());
        const hoursNow = new Date(0,0,0, current.getHours(), current.getMinutes())
        return this.getDateOpening(url).then(resp => {
            if(resp.valueOf() === currentDay.valueOf()) {
                        return this.getHourOpening(url).then(respOne => {
                            return (respOne[0] < hoursNow && hoursNow < respOne[1]);
                        });
                    }else{
                        return false;
                    }
                });
    }
    private setter() {
        this.getHourOpening(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                timesDinning: resp,
            })
        });
        this.getDateOpening(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                dateCafeteria: resp,
            })
        });
        this.getHourOpening(CafeteriaOpeningConfig.URL_KOERI_OPENING_TIMES).then(resp => {
            this.setState({
                timesKoeri: resp,
            })
        });
        this.getHourOpening(CafeteriaOpeningConfig.URL_PIZZA_OPENING_TIMES).then(resp => {
            this.setState({
                timesPizza: resp,
            })
        });
        this.getHourOpening(CafeteriaOpeningConfig.URL_CAFETERIA_OPENING_TIMES).then(resp => {
            this.setState({
                timesCafeteria: resp,
            })
        });
        this.openToday(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
            this.setState({
                openToday: resp,
            })
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
        const currentDay= new Date(current.getFullYear(), current.getMonth(), current.getDate());
        const comparatorDate = new Date(0,0,0,current.getHours(), current.getMinutes(), current.getSeconds());
        return this.getDateOpening(url).then(respOne => {
            //check if current time is after closing time
            return this.getHourOpening(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).then(resp => {
                return (respOne.valueOf() === currentDay.valueOf()) && comparatorDate < resp[1];
            });
        });
    }
    componentDidMount() {
        this.setter();
        setInterval(() => this.setter(), CafeteriaOpeningConfig.REFRESH_RATE);
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
            return date.toLocaleDateString(["en"], {
                    day: "numeric",
                    month: "long",
                });
        } catch (e) {
            //ignore
        }
    }
    private getTime(date: Date) {
        return date.toLocaleTimeString("de", {hour: '2-digit', minute: '2-digit'});
    }
    render() {
        return ((this.state.loadedDinning && this.state.loadedPizza && this.state.loadedKoeri && this.state.loadedCafeteria) ?
        <div className="grid grid-flow-row sm:gap-0.5 xl:gap-1.5 2xl:gap-2 items-center box-border h-fit">
            <div
                className="grid grid-flow-row sm:gap-1 lg:gap-4 xl:gap-6 4xl:gap-7 8xl:gap-9 font-light leading-normal sm:text-xs md:text-sm lg:text-base lg:text-xl 2xl:text-2xl 4xl:text-4xl 8xl:text-5xl sm:text-left">
                <div className="grid grid-flow-row sm:gap-1 lg:gap-2 xl:gap-3 4xl:gap-4 8xl:gap-5">
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>Dining Hall:&nbsp;
                        </div>
                        <div
                            className="font-extralight bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3" style={{
                            backgroundColor: (this.state.openDinningRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                            borderRadius: "500px"
                        }}>
                            {(this.state.openDinningRightNow ? "open" : "closed")}
                        </div>
                        until
                        {(this.state.openDinningRightNow ? <div>
                            {this.getTime(this.state.timesDinning[1])}
                        </div> : <div>
                            {this.getTime(this.state.timesDinning[0])}
                        </div>)}
                    </div>
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>[koeri]Werk:&nbsp;
                        </div>
                        <div
                            className="font-extralight bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3" style={{
                            backgroundColor: (this.state.openKoeriRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                            borderRadius: "500px"
                        }}>
                            {(this.state.openKoeriRightNow ? "open" : "closed")}
                        </div>
                        until
                        {(this.state.openKoeriRightNow ? <div>
                            {this.getTime(this.state.timesKoeri[1])}
                        </div> : <div>
                            {this.getTime(this.state.timesKoeri[0])}
                        </div>)}
                    </div>
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>[pizza+pasta]Werk:&nbsp;
                        </div>
                        <div
                            className="font-extralight bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3" style={{
                            backgroundColor: (this.state.openPizzaRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                            borderRadius: "500px"
                        }}>
                            {(this.state.openPizzaRightNow ? "open" : "closed")}
                        </div>
                        until
                        {(this.state.openPizzaRightNow ? <div>
                            {this.getTime(this.state.timesPizza[1])}
                        </div> : <div>
                            {this.getTime(this.state.timesPizza[0])}
                        </div>)}
                    </div>
                    <div className="flex sm:gap-1 lg:gap-2 4xl:gap-3 box-border items-center">
                        <div>Cafeteria:&nbsp;
                        </div>
                        <div
                            className="font-extralight bg-transparent w-auto h-auto inline-block text-white sm:px-1 xl:px-2 2xl:px-3" style={{
                            backgroundColor: (this.state.openCafeteriaRightNow ? this.props.specialBoldFontColor : this.props.specialSubtleFontColor),
                            borderRadius: "500px"
                        }}>
                            {(this.state.openCafeteriaRightNow ? "open" : "closed")}
                        </div>
                        until
                        {(this.state.openCafeteriaRightNow ? <div>
                            {this.getTime(this.state.timesCafeteria[1])}
                        </div> : <div>
                            {this.getTime(this.state.timesCafeteria[0])}
                        </div>)}
                    </div>
                </div>
                <div>
                    {(this.state.openDinningRightNow ? <div/>:
                        <div>
                            Reopens: {(this.state.openToday) ? " Today" : " " + this.reformatDate(this.state.dateCafeteria)}
                        </div>)
                    }
                </div>
            </div>
        </div> : <div/>)
    }
}