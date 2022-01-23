import * as React from "react";
import {SquareHolder} from "./SquareHolder";
import {DigitalTime} from "../widget_catalog/time/DigitalTime";
import {Weather} from "../widget_catalog/weather/Weather";
import {WidgetLoader} from "../widget/WidgetLoader";
import {WidgetPersistence} from "../../shared/persistence/WidgetPersistence";
import {WidgetData} from "../widget/WidgetData";

interface RootComponentState {
    widgetDataByLocation: WidgetData[][];
}

export class RootComponent extends React.Component<any, RootComponentState> {

    private readonly widgetLoader = new WidgetLoader();
    private readonly widgetPersistence = new WidgetPersistence();

    constructor(props: any) {
        super(props);

        this.state = {
            widgetDataByLocation: [[], [], [], [], [], []],  // 6 locations possible
        };
    }

    componentDidMount() {
        // Query a list of all widget data.
        // setState() is called once they are received and will trigger re-rendering.
        this.widgetPersistence.getWidgetDataList().then(widgetDataList => this.setState({
            // separate the widgetData by location
            widgetDataByLocation: [0, 1, 2, 3, 4, 5].map(location => widgetDataList.filter(widgetData => widgetData.location === location))
        }));
    }

    private renderLocation(location: number) {
        const widgetDataList = this.state.widgetDataByLocation[location];
        if (widgetDataList.length === 0) {
            return <SquareHolder />;
        } else {
            const widgetData = widgetDataList[0];//todo: rotate dynamically
            return this.renderWidget(widgetData);
        }
    }

    private renderWidget(widgetData: WidgetData) {
        const widget = this.widgetLoader.getWidget(widgetData.widgetId);

        try {
            const widgetComponent = widget.createDisplayComponent(widgetData.rawConfig);
            return <SquareHolder title={widget.getTitle()} fill={widget.getFill()}>
                {widgetComponent}
            </SquareHolder>;
        } catch (e) {
            // todo: make design for error message nicer
            return <SquareHolder title={widget.getTitle()}>
                <p>Error while creating widget: {e.message}</p>
            </SquareHolder>;
        }
    }

    render() {

        // go through the list of all widget data and render them in their respective locations

        return <div className="bg-cover bg-no-repeat bg-center" style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            backgroundImage: `url("https://images.wallpaperscraft.com/image/single/city_skyscrapers_clouds_rain_road_cars_lights_58563_3840x2160.jpg")`
        }}>
            <div className="flex">
                <div className="z-30 absolute left-10 absolute bottom-7">
                    <img className="sm:w-24 lg:w-40 2xl:w-60 4xl:w-80"
                         src="https://www.artwork.de/wp-content/uploads/2015/08/logo_TF_NEU_4c_ai.png" alt="IHKLogo"/>
                </div>
                <div className="z-20 sm:w-4/12 mx-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
                     style={{
                         height: "100vh"
                     }}>
                    <div
                        className="sm:p-4 lg:p-6 xl:p-8 4xl:p-12 8xl:p-14 grid grid-rows-2 grid-flow-row gap-8 box-border">
                        <div>
                            <DigitalTime/>
                            <Weather/>
                        </div>
                        {this.renderLocation(1)}
                    </div>
                </div>
                <div className="z-10 w-2/3 sm:p-4 lg:p-6 xl:p-8 4xl:p-12 8xl:p-14 absolute right-0 grid grid-cols-2 box-border sm:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6 8xl:gap-8">
                        {this.renderLocation(2)}
                        {this.renderLocation(3)}
                        {this.renderLocation(4)}
                        {this.renderLocation(5)}

                </div>
            </div>
        </div>;
    }
}