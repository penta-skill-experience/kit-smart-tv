import * as React from "react";
export class SquareHolder extends React.Component<any, any> {

    render() {
        return <div className="w-full shadow-2xl rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70">
            {this.props.children}
            <div className="flex space-x-1 justify-center p-2" style={{
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
        </div>;
    }
}