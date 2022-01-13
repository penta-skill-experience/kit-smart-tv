import * as React from "react";
import {SquareHolder} from "./SquareHolder";

export class RootComponent extends React.Component<any, any> {
    render() {
        return <section className="h-screen bg-[#F3F4F6]">
            <div className="flex h-screen justify-center">
                <div className="grid place-items-center">
                <div className="grid gap-x-60 gap-y-30 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="w-full">
                        <SquareHolder />
                    </div>
                    <div className="w-full">
                        <SquareHolder />
                    </div>
                    <div className="w-full">
                        <SquareHolder />
                    </div>
                    <div className="w-full">
                        <SquareHolder />
                    </div>
                    <div className="w-full">
                        <SquareHolder />
                    </div>
                    <div className="w-full">
                        <SquareHolder />
                    </div>
                </div>
                </div>
            </div>;
        </section>
    }
}