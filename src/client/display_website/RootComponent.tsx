import * as React from "react";
import {SquareHolder} from "./SquareHolder";
import {DigitalTime} from "./DigitalTime";
import {Weather} from "./Weather";
import {TramSchedule} from "./TramSchedule";

export class RootComponent extends React.Component<any, any> {
    render() {
        return <div className = "w-full min-h-screen bg-cover bg-no-repeat bg-center" style={{
            backgroundImage: `url("https://images.wallpaperscraft.com/image/single/city_skyscrapers_clouds_rain_road_cars_lights_58563_3840x2160.jpg")`
        }}>
            <div className="flex flex-wrap">
                <div className="z-30 absolute right-10 absolute bottom-7">
                    <img className="sm:w-3/4 lg:w-full" src="https://www.artwork.de/wp-content/uploads/2015/08/logo_TF_NEU_4c_ai.png" alt="IHKLogo"/>
                </div>
                <div className="z-20 lg:w-4/12 mx-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">

                    <div className="grid grid-rows-2 grid-flow-row gap-8 min-h-screen box-border p-10">
                        <div>
                            <DigitalTime/>
                            <Weather/>
                        </div>
                        <SquareHolder title = "Tram Schedule" subTitle = "(Durlacher Tor)">
                            <TramSchedule/>
                        </SquareHolder>
                    </div>
                </div>
                <div className="z-10 w-2/3 absolute right-0">
                    <div className="grid grid-cols-2 gap-8 min-h-screen box-border p-8">
                        <SquareHolder />
                        <SquareHolder />
                        <SquareHolder />
                        <SquareHolder />
                    </div>
                </div>
            </div>
        </div>;
    }
}