import * as React from "react";
import * as CafeteriaMenuConfig from "./CafeteriaMenu.json";
import axios from "axios"

interface OptionData {
    food: string;
    location: string;
}

interface CafeteriaMenuState {
    menus: OptionData[];
    date: string;
}

export class CafeteriaMenuDisplayComponent extends React.Component<any, CafeteriaMenuState> {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            date: ""
        };
    }

    getMenu() {
        axios.get(CafeteriaMenuConfig.URL)
            .then(resp => {
                this.setState({
                    date: resp.data[0].date, //check for first day that it's open
                    menus: resp.data[0].meals.map(d => ({
                        food: d.name,
                        location: d.category
                    })),
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getMenu();
        setInterval(() => this.getMenu(), CafeteriaMenuConfig.REFRESH_RATE);
    }

    render() {
        return <div className="grid grid-flow-row box-border">
            {
                this.state.menus//.slice(1, CafeteriaMenuConfig.ITEM_COUNT)
                    .map((d, index) =>
                        <div key = {index}
                            className="font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                            <b>{d.food}</b>:
                            <div
                                className="font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl">
                                {d.location}
                            </div>
                            <br />
                        </div>
                    )
            }
        </div>;
    }
}