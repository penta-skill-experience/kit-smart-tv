import demoImg from "./img/demo.jpg";
import * as React from "react";

export class RootComponent extends React.Component<any, any> {
    render() {
        return <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src={demoImg}
                         alt="Demo Image"/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Example</div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Some HTML designed with Tailwind CSS</a>
                    <p className="mt-2 text-gray-500">
                        You can remove this if you want.
                        Have a look at <a href={"https://tailwindcss.com/"}>tailwind</a>.</p>
                </div>
            </div>
        </div>;
    }
}