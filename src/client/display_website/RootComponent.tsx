import * as React from "react";
import {SquareHolder} from "./SquareHolder";
import {TimeDisplayComponent} from "../widget_catalog/time/TimeDisplayComponent";
import {WeatherDisplayComponent} from "../widget_catalog/weather/WeatherDisplayComponent";
import {WidgetLoader} from "../widget/WidgetLoader";
import {WidgetPersistence} from "../../shared/persistence/WidgetPersistence";
import {WidgetData} from "../widget/WidgetData";
import {RotatorComponent} from "./RotatorComponent";
import * as RootComponentConfig from "./RootComponent.json";
import {DesignUtility} from "../../shared/persistence/DesignUtility";

interface RootComponentState {
    widgetDataByLocation: WidgetData[][];
    themeID;
    titleFontColor;
    bodyFontColor;
    specialBoldFontColor;
    specialSubtleFontColor;
    accentBarColor;
    backgroundImage;
    relativeSize;
}

export class RootComponent extends React.Component<any, RootComponentState> {
    private readonly widgetLoader = new WidgetLoader();
    private readonly widgetPersistence = new WidgetPersistence();

    constructor(props: any) {
        super(props);

        this.state = {
            widgetDataByLocation: [[], [], [], [], [], []],  // 6 locations possible
            themeID: "",
            titleFontColor: "",
            bodyFontColor: "",
            specialBoldFontColor: "",
            specialSubtleFontColor: "",
            accentBarColor: "",
            backgroundImage: "",
            relativeSize: 0
        };
    }

    switchFontSizeDocument(relativeSize: number) {
        document.documentElement.style.fontSize = relativeSize + "rem";
    }

    loadTheme() {
        DesignUtility.getDesignConfigValues()
            .then(design => {
                this.setState({
                    relativeSize: design.fontSize.relativeSize,
                    themeID: design.colorScheme.id,
                    titleFontColor: design.colorScheme.titleFontColor,
                    bodyFontColor: design.colorScheme.bodyFontColor,
                    specialBoldFontColor: design.colorScheme.specialBoldFontColor,
                    specialSubtleFontColor: design.colorScheme.specialSubtleFontColor,
                    accentBarColor: design.colorScheme.accentBarColor,
                    backgroundImage: design.background,
                });
                this.switchFontSizeDocument(design.fontSize.relativeSize);
            })
            .catch(reason => console.error(`Failed to get design values from server. Reason: ${reason}`));
    }
    loadWidget() {
        this.widgetPersistence.getWidgetDataList()
            .then(widgetDataList => this.setState({
                // separate the widgetData by location
                widgetDataByLocation: [0, 1, 2, 3, 4, 5].map(location => widgetDataList.filter(widgetData => widgetData.location === location))
            }))
            .catch(reason => console.error(`Failed to load widgets from server. Reason: ${reason}`));
    }
    componentDidMount() {
        // Query a list of all widget data.
        // setState() is called once they are received and will trigger re-rendering.
        this.loadWidget();
        this.loadTheme();
        setInterval(() => {
            this.loadTheme();
            this.loadWidget();
        }, RootComponentConfig.ADMIN_PAGE_REFRESH_RATE);
    }

    private renderLocation(location: number) {
        const widgetDataList = this.state.widgetDataByLocation[location];
        if (widgetDataList.length === 0) {
            return <SquareHolder title={""} accentColor={this.state.accentBarColor}
                                 titleColor={this.state.titleFontColor} specialBoldFontColor={this.state.specialBoldFontColor}
                                 specialSubtleFontColor={this.state.specialSubtleFontColor}/>;
        } else {
            return <RotatorComponent>
                {
                    widgetDataList.map((d, index) =>
                        <div key={index}>
                            {this.renderWidget(d)}
                        </div>
                    )
                }
            </RotatorComponent>
        }
    }

    private renderWidget(widgetData: WidgetData) {
        const widget = this.widgetLoader.getWidget(widgetData.widgetId);
        return <SquareHolder displayComponentClass={widget.getDisplayComponentClass()}
                             rawConfig={widgetData.rawConfig}
                             title={widget.getTitle()} accentColor={this.state.accentBarColor}
                             titleColor={this.state.titleFontColor}
                             specialBoldFontColor={this.state.specialBoldFontColor}
                             specialSubtleFontColor={this.state.specialSubtleFontColor}/>;
    }

    render() {
        // go through the list of all widget data and render them in their respective locations
        return <div className="bg-cover bg-no-repeat bg-center" id="mainFrame" style={{
            backgroundImage: 'url(' + this.state.backgroundImage + ')',
            width: "100vw",
            height: "100vh",
            fontSize: this.state.relativeSize + "rem",
        }}>
            <div className={"flex "} style={{
                color: this.state.bodyFontColor
            }}>
                <div className="z-50 absolute left-10 absolute bottom-7">
                    <img className="sm:w-24 lg:w-40 2xl:w-60 4xl:w-80"
                         src="https://www.artwork.de/wp-content/uploads/2015/08/logo_TF_NEU_4c_ai.png" alt="IHKLogo"/>
                </div>
                <div className="z-20 sm:w-1/3 mx-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
                     style={{
                         height: "100vh"
                     }}>
                </div>
                <div
                    className="z-20 grid grid-cols-3 absolute left-0 grid-rows-2 sm:gap-2 md:gap-3 lg:gap-5 xl:gap-7 4xl:gap-10 sm:p-2 md:p-3 lg:p-5 xl:p-7 4xl:p-10" style={{
                    width:"100vw",
                    height:"100vh",
                }}>
                    <div className = "sm:pl-2 md:pl-3 lg:pl-5 xl:pl-7 4xl:pl-10">
                        {/*todo: log errors*/}
                        <TimeDisplayComponent error={() => {}}/>
                        <WeatherDisplayComponent error={() => {}}/>
                    </div>
                    {this.renderLocation(1)}
                    {this.renderLocation(2)}
                    {this.renderLocation(3)}
                    {this.renderLocation(4)}
                    {this.renderLocation(5)}
                </div>
            </div>
        </div>;
    }
}