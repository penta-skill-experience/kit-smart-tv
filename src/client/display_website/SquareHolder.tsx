import * as React from "react";

export class SquareHolder extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: undefined,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    render() {
        return <div className="w-fit">
            <div className="shadow-2xl rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70">
                <div
                    className="sm:pl-1 sm:pr-1 lg:pr-4 2xl:pr-6 font-light leading-normal text-green-600 sm:text-base md:text-xl lg:text-2xl xl:text-4xl 2xl:text-5xl 8xl:text-6xl">
                    {this.props.title}
                </div>
                <div
                    className="sm:pl-1 2xl:pr-5 font-light leading-normal text-green-600 sm:text-sm lg:text-base xl:text-xl 2xl:text-2xl 8xl:text-3xl">
                    {this.props.subTitle}
                </div>
                <div className="sm:pl-3 sm:pt-1 sm:pb-1 sm:pr-2 xl:pt-3 xl:pl-8 xl:pr-5 xl:pb-4 4xl:pl-12">
                    {this.state.hasError ?
                        // todo: make design for error message nicer
                        <p>Error: {this.state.error.message}(</p>
                        : this.props.children  // only show children if they didn't produce an error
                    }
                    <div className="flex space-x-1 justify-center" style={{
                        opacity: 1
                    }}>
                        <a href="#"
                           className="rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                        </a>
                        <a href="#"
                           className="rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                        </a>
                        <a href="#"
                           className="rounded-full bg-gray-600 rounded-md hover:bg-gray-800 hover:text-white">
                        </a>
                    </div>
                </div>
            </div>
        </div>;
    }
}