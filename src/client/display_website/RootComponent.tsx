import * as React from "react";
import {SquareHolder} from "./SquareHolder";
import {DigitalTime} from "../widget_catalog/time/DigitalTime";
import {Weather} from "../widget_catalog/weather/Weather";
import {WidgetLoader} from "../widget/WidgetLoader";
import {WidgetPersistence} from "../../shared/persistence/WidgetPersistence";
import {WidgetData} from "../widget/WidgetData";
import {RotatorComponent} from "./RotatorComponent";
import {DesignValuesPersistence} from "../../shared/persistence/DesignValuesPersistence";
import {DesignConfigPersistence} from "../../shared/persistence/DesignConfigPersistence";
import * as RootComponentConfig from "./RootComponent.json";

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
    private designValuesPersistence = new DesignValuesPersistence();
    private designConfigPersistence = new DesignConfigPersistence();
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
        document.documentElement.style.fontSize =  relativeSize + "rem";
    }

    loadTheme() {
        const theme = this.designConfigPersistence.getSelectedColorSchemeId();
        const fontSize = this.designConfigPersistence.getSelectedFontSizeId();
        this.designValuesPersistence.getFontSize(fontSize).then(resp => {
            this.setState({
                relativeSize: resp.relativeSize
            });
            this.switchFontSizeDocument(resp.relativeSize);
        });
        this.designValuesPersistence.getColorScheme(theme).then(resp => {
            this.setState({
                themeID: resp.id,
                titleFontColor: resp.titleFontColor,
                bodyFontColor: resp.bodyFontColor,
                specialBoldFontColor: resp.specialBoldFontColor,
                specialSubtleFontColor: resp.specialSubtleFontColor,
                accentBarColor: resp.accentBarColor,
                backgroundImage: this.designConfigPersistence.getSelectedBackground(),
            });
        });
    }

    componentDidMount() {
        // Query a list of all widget data.
        // setState() is called once they are received and will trigger re-rendering.
        this.widgetPersistence.getWidgetDataList().then(widgetDataList => this.setState({
            // separate the widgetData by location
            widgetDataByLocation: [0, 1, 2, 3, 4, 5].map(location => widgetDataList.filter(widgetData => widgetData.location === location))
        }));
        this.loadTheme();
        setInterval(() => this.loadTheme(), RootComponentConfig.ADMIN_PAGE_REFRESH_RATE);
    }

    private renderLocation(location: number) {
        const widgetDataList = this.state.widgetDataByLocation[location];
        if (widgetDataList.length === 0) {
            return <SquareHolder title={""} accentColor={this.state.accentBarColor}
                                 titleColor={this.state.titleFontColor}/>;
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
        try {
            const widgetComponent = widget.createDisplayComponent(widgetData.rawConfig);
            return <SquareHolder title={widget.getTitle()} accentColor={this.state.accentBarColor}
                                 titleColor={this.state.titleFontColor}>
                {widgetComponent}
            </SquareHolder>;
        } catch (e) {
            // todo: make design for error message nicer
            return <SquareHolder title={widget.getTitle()} accentColor={this.state.accentBarColor}
                                 titleColor={this.state.titleFontColor}>
                <p>Error while creating widget: {e.message}</p>
            </SquareHolder>;
        }
    }

    render() {
        // go through the list of all widget data and render them in their respective locations
        return <div className="bg-cover bg-no-repeat bg-center" id="mainFrame" style={{
            backgroundImage: 'url(' + this.state.backgroundImage + ')',
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            fontSize: this.state.relativeSize + "rem",
        }}>
            <div className={"flex "} style={{
                color: this.state.bodyFontColor
            }}>
                <div className="z-20 absolute left-10 absolute bottom-7">
                    <img className="sm:w-24 lg:w-40 2xl:w-60 4xl:w-80"
                         src="https://www.artwork.de/wp-content/uploads/2015/08/logo_TF_NEU_4c_ai.png" alt="IHKLogo"/>
                </div>
                <div className="z-10 sm:w-4/12 mx-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30"
                     style={{
                         height: "100vh"
                     }}>
                    <div
                        className="sm:p-4 lg:p-6 xl:p-8 4xl:p-12 8xl:p-14 grid grid-rows-2 grid-flow-row box-border lg:gap-3 xl:gap-4 4xl:gap-6 8xl:gap-8">
                        <div>
                            <DigitalTime/>
                            <Weather/>
                        </div>
                        {this.renderLocation(1)}
                    </div>
                </div>
                <div
                    className="w-2/3 sm:p-4 lg:p-6 xl:p-8 4xl:p-12 8xl:p-14 absolute right-0 grid grid-cols-2 box-border sm:gap-2 lg:gap-3 xl:gap-4 4xl:gap-6 8xl:gap-8">
                    {this.renderLocation(2)}
                    {this.renderLocation(3)}
                    {this.renderLocation(4)}
                    {this.renderLocation(5)}
                </div>
            </div>
        </div>;
    }
}