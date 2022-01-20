import * as React from "react";
export class SquareHolder extends React.Component<any, any> {

    render() {
        return <div className="w-fit">
            <div className="shadow-2xl rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70">
                <span className="pt-5 pl-5 font-light leading-normal text-green-600 text-base sm:text-8xl">
                    {this.props.title}
                </span>
                <span className="pr-5 pl-3 pr-5 font-light leading-normal text-green-600 text-base sm:text-4xl">
                    {this.props.subTitle}
                </span>
                <div className = "pt-5 pl-10 pr-5 pb-4">
                    {this.props.children}
                <div className="flex space-x-1 justify-center p-2 pt-5" style={{
                    opacity: 1
                }}>
                    <a href="#"
                       className="px-1 py-1 rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white ">
                    </a>
                    <a href="#"
                       className="px-1 py-1 rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                    </a>
                    <a href="#"
                       className="px-1 py-1 rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                    </a>
                </div>
                </div>
            </div>
        </div>;
    }
}