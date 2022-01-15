import * as React from "react";
import {SquareHolder} from "./SquareHolder";
export class RootComponent extends React.Component<any, any> {
    render() {
        return <div className = "w-screen h-screen bg-no-repeat bg-cover bg-center" style={{
            backgroundImage: `url("https://images.wallpaperscraft.com/image/single/city_skyscrapers_clouds_rain_road_cars_lights_58563_3840x2160.jpg")`
        }}>
            <div className="w-full h-full flex lg:h-screen flex-wrap mx-auto lg:my-0">
                <div className="z-30 absolute right-10 absolute bottom-7">
                    <img className="lg:w-full" src="https://www.artwork.de/wp-content/uploads/2015/08/logo_TF_NEU_4c_ai.png" alt="IHKLogo"/>
                </div>
                <div className="z-20 w-full h-screen lg:w-4/12 mx-0 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30">
                    <div className="pl-4 pr-4 pb-2 pt-2 grid grid-rows-2 gap-8 mt-2">
                        <div className="w-full h-0 pb-full"/>
                        <SquareHolder/>
                    </div>
                </div>
                <div className="z-10 w-2/3 absolute right-0">
                    <div className="pl-4 pr-4 pb-2 pt-2 grid grid-cols-2 gap-8 mt-2">
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